<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>This is a simple project based on blockchain</h2>
    <div style="margin:0 auto;width:500px;margin-bottom:100px;margin-top:50px">
      <h3 style="text-align:left;"> What can you do here? </h3>
      <h4 style="text-align:left;"> 1. You can freely post your comments here. </h4>
      <h4 style="text-align:left;"> 2. You can also participate in our mining work to get a certain amount of tokens or get rewards by providing quality reviews.</h4>
    </div>
    <div style="margin:0 auto;width:500px;margin-bottom:100px;margin-top:50px">
      <h3 style="text-align:left;"> Where you need to pay attention? </h3>
      <h4 style="text-align:left;"> 1. Save your account information. </h4>
      <h4 style="text-align:left;"> 2. Please mind your words.</h4>
    </div>
    <el-row>
      <router-link to="/login"><el-button type="primary" v-if="this.$store.state.account == ''">Login</el-button></router-link>
      <router-link to="/signup"><el-button type="info" v-if="this.$store.state.account == ''">Signup</el-button></router-link>
      <router-link to="/"><el-button type="success" v-if="this.$store.state.account !== ''">Start</el-button></router-link>
    </el-row>
    <div class="github">
      <div>
        <svg height="32" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
          </path>
        </svg>
      </div>
      <a href="https://github.com/Liu-YT/public-comment">Learn more</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome'
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

.github {
  margin: 0 auto;
  width: 200px;
  height: 100px;
  margin-top: 50px;
  vertical-align: middle;
}
</style>
