<template>
  <div class="info">
    <div style="margin:0 auto;margin-top:15px;width:60%;">
      <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <h1> {{name}} </h1>
    <h1> {{password}} </h1>
  </div>
</template>

<script>
export default {
  data () {
    let temp = `未登录`
    if (this.$store.state.account !== '') {
      temp = this.$store.state.account
    }
    return {
      name: temp,
      password: this.$store.state.password,
      input3: '',
      input4: '',
      input5: '',
      select: ''
    }
  }
}
</script>
<style>

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
