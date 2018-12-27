<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" style="width:300px;margin:0 auto;margin-top:100px;" class="demo-ruleForm">
    <el-form-item label="标题" prop="name" style="width:400px">
      <el-input type="text" v-model="ruleForm2.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="theme">
      <el-select v-model="ruleForm2.theme" placeholder="请选择类型" style="width:300px">
        <el-option label="美食" value="美食" style="width:300px"></el-option>
        <el-option label="科技" value="科技" style="width:300px"></el-option>
        <el-option label="出行" value="出行" style="width:300px"></el-option>
        <el-option label="购物" value="购物" style="width:300px"></el-option>
        <el-option label="日常" value="日常" style="width:300px"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm2('ruleForm2')" :loading='createlogining'>提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { address, FacABI } from './../util/constract'
export default {
  data () {
    return {
      ruleForm2: {
        name: '',
        theme: ''
      },
      createlogining: false,
      rules2: {
        name: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        theme: [
          {required: true, message: '请选择类型', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm2 (ev) {
      let _this = this
      this.createlogining = true
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.$web3.eth.personal.unlockAccount(this.$store.state.account, this.$store.state.password).then(
            function (result) {
              if (result) {
                try {
                  var fac = new _this.$web3.eth.Contract(FacABI, address)
                  fac.methods.createObject(_this.ruleForm2.name, _this.ruleForm2.theme, _this.$store.state.account, String(Date.parse(new Date())))
                    .send({from: _this.$store.state.account, gas: '3000000'})
                    .then(
                      function (err, result) {
                        console.log(err, result)
                        _this.$notify({
                          title: '提示',
                          message: '你的交易已被确认',
                          type: 'success',
                          duration: 0
                        })
                      }
                    )
                    .catch(
                      function (err) {
                        console.log(err)
                        _this.resetForm('')
                        _this.$message({
                          message: '余额不足',
                          type: 'err',
                          showClose: true
                        })
                      }
                    )
                  _this.createlogining = false
                  _this.$message({
                    message: '新建成功，正在被确认',
                    type: 'success',
                    showClose: true
                  })
                } catch (err) {
                  _this.$message({
                    message: '未知错误，请重试',
                    type: 'err',
                    showClose: true
                  })
                }
              } else {
                this.createlogining = false
                this.$message({
                  message: '解锁账号失败',
                  type: 'error',
                  showClose: true
                })
              }
            }
          )
        } else {
          this.createlogining = true
          this.$message({
            message: '请完成必要的信息输入',
            type: 'error',
            showClose: true
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs.ruleForm2.resetFields()
    }
  }
}
</script>

<style>
h1 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
