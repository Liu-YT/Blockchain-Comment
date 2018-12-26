<template>
  <div id="app">
    <el-menu
      ref="menu"
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      text-color="#080808"
      background-color="#FCFCFC">
      <div style="float:left;" class="logo" :style='logoDiv'></div>
      <el-menu-item index="/" style="margin-right:50px;">众评中心</el-menu-item>
      <el-submenu index="/user" style="margin-right:50px;">
        <template slot="title">个人中心</template>
        <el-menu-item index="/user/info">
         <i class="el-icon-document"></i>
          我的相关
        </el-menu-item>
        <el-menu-item index="/user/create">
          <i class="el-icon-plus"></i>
          创建新评论
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/about" style="margin-right:50px;">关于</el-menu-item>
      <el-tooltip class="item" style="float:right;" effect="light" v-bind:content="this.$store.state.account == '' ? '未登录' : this.$store.state.account" placement="bottom">
        <div class="avatar" :style='avatarDiv'></div>
      </el-tooltip>
      <el-menu-item index="4" style="margin-right:10px;float:right;" v-if="this.$store.state.account != ''" >退出</el-menu-item>
      <el-menu-item index="5" style="margin-right:10px;float:right;" v-if="this.$store.state.account == ''" >登陆</el-menu-item>
      <el-menu-item index="6" style="margin-right:10px;float:right;" v-if="this.$store.state.account == ''" >注册</el-menu-item>
    </el-menu>
    <router-view v-on:update="update($event)"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    let avatar = 'url(' + require('./assets/defaultAvatar.jpg') + ')'
    if (this.$store.state.account !== '') {
      avatar = 'url(' + require('./assets/avatar.jpg') + ')'
    }
    return {
      activeIndex: '1',
      avatarDiv: {
        backgroundImage: avatar,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        outline: 'none'
      },
      logoDiv: {
        backgroundImage: 'url(' + require('./assets/comLogo.png') + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        outline: 'none'
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key)
      if (key === '/') {
        // 主页
        this.$router.push('/comment')
      } else if (key.search('/user') !== -1) {
        // 个人操作
        if (this.$store.state.account === '') {
          this.$message({
            message: '请先登陆再操作',
            showClose: true,
            type: 'error'
          })
        } else {
          this.$router.push(key)
        }
      } else if (key === '/about') {
        // 网站信息
        this.$router.push('/about')
      } else if (key === '4') {
        // 退出
        this.$store.state.account = ''
        this.$store.state.password = ''
        localStorage.removeItem('info')
        this.avatarDiv.backgroundImage = 'url(' + require('./assets/defaultAvatar.jpg') + ')'
        this.$router.push('/')
      } else if (key === '5') {
        // 登陆
        this.$router.push('/login')
      } else {
        // 注册
        this.$router.push('/signup')
      }
    },
    update (account) {
      this.content = account
      this.avatarDiv.backgroundImage = 'url(' + require('./assets/avatar.jpg') + ')'
    }
  },
  created () {
    localStorage.getItem('info') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem('info'))))
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('info', JSON.stringify(this.$store.state))
    })
    if (this.$store.state.account !== '') {
      this.avatarDiv.backgroundImage = 'url(' + require('./assets/avatar.jpg') + ')'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.bottom {
  clear: both;
  text-align: center;
}

.item {
  margin: 4px;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 20px;
  margin-top: 8px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}

.logo {
  width: 45px;
  height: 45px;
  margin-left: 20px;
  margin-top: 8px;
  margin-right: 20px;
}

</style>
