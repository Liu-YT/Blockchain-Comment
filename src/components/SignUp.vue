<template>
  <div class = "note" :style = "note">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">注册</h3>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码" clearable></el-input>
      </el-form-item>
      <el-form-item prop="checkCode">
        <el-input placeholder="请输入验证码" v-model="ruleForm.checkCode" clearable class="input"></el-input>
        <div class="code" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;"  @click="submitForm('ruleForm')" :loading="logining">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SIdentify from './SIdentify.vue'
import { coinbase } from '../util/constract'
export default {
  data () {
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      logining: false,
      note: {
        position: 'absolute',
        opacity: 0.8,
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundImage: 'url(' + require('../assets/background.jpg') + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      },
      ruleForm: {
        checkPass: '',
        checkCode: ''
      },
      rules: {
        checkPass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (ev) {
      let _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid && this.identifyCode === this.ruleForm.checkCode) {
          _this.logining = true
          _this.$web3.eth.personal.newAccount(_this.ruleForm.checkPass, (err, result) => {
            _this.logining = false
            if (err) {
              _this.$message({
                message: '创建失败，请再次尝试',
                showClose: true,
                type: 'error'
              })
            } else {
              _this.$web3.eth.personal.unlockAccount(coinbase, '').then(
                function (unlock) {
                  if (unlock) {
                    _this.$message({
                      message: '创建成功，请记住你的账号',
                      type: 'success',
                      showClose: true
                    })
                    var info = '你的账号: ' + result
                    _this.$notify({
                      title: '提示',
                      message: '获得 0.5 eth 的初始奖励，稍后到账'
                    })
                    try {
                      _this.$web3.eth.sendTransaction({from: coinbase, to: result, value: '500000000000000000'})
                        .then(
                          function (err, r) {
                            console.log(err, r)
                          }
                        )
                        .catch(
                          function (err) {
                            console.log(err)
                          }
                        )
                    } catch (err) {
                      console.log(err)
                    }
                    _this.$alert(info, '重要信息', {
                      confirmButtonText: '我已记住',
                      callback: action => {
                        _this.$router.push('/login')
                      }
                    })
                  }
                })
            }
          })
        } else if (!valid) {
          _this.logining = false
          _this.$message({
            message: '请输入密码',
            showClose: true,
            type: 'error'
          })
        } else {
          _this.logining = false
          _this.$message({
            message: '验证码错误',
            showClose: true,
            type: 'error'
          })
        }
      })
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  components: {
    's-identify': SIdentify
  }
}
</script>
<style>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  opacity: 1;
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.input {
  width: 200px;
  vertical-align: middle;
  margin-right: 30px;
  float: left;
}

.code {
  width: 100px;
  height: 40px;
  vertical-align: middle;
  float: left;
}
</style>
