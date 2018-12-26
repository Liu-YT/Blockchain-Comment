<template>
  <div class = "note" :style = "note">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="on"  placeholder="账号" clearable></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码" clearable></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;"  @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
      </el-form-item>
      <router-link to="signup"><div class='registered'>没有账号?现在注册</div></router-link>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logining: false,
      note: {
        position: 'absolute',
        opacity: 0.8,
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundImage: 'url(' + require('../assets/background1.jpg') + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      },
      ruleForm: {
        account: '',
        checkPass: ''
      },
      rules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        checkPass: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (ev) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true
          var loginParams = { account: this.ruleForm.account, password: this.ruleForm.checkPass }
          try {
            this.$web3.eth.personal.unlockAccount(loginParams.account, loginParams.password, (err, result) => {
              this.logining = false
              console.log(err)
              if (err) {
                this.$message({
                  message: '账号或者密码不正确',
                  showClose: true,
                  type: 'error'
                })
              } else {
                this.$message({
                  message: '登陆成功',
                  type: 'success',
                  showClose: true
                })
                this.$store.state.account = loginParams.account
                this.$store.state.password = loginParams.password
                this.$emit('update', this.$store.state.account)
                this.$router.push('/')
              }
            })
          } catch (err) {
            this.logining = false
            console.log(err)
            this.$message({
              message: '账号不正确',
              showClose: true,
              type: 'error'
            })
          }
        } else {
          this.logining = false
          this.$message({
            message: '请输入账号和密码',
            showClose: true,
            type: 'error'
          })
          return false
        }
      })
    }
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

.remember {
  margin: 0px 0px 35px 0px;
}
</style>
