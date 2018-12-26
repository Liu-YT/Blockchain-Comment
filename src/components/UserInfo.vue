<template>
  <div v-loading="loading" style="width:100%">
    <div class="info userInfo" id="info">
      <h1>用户信息</h1>
      <div class="accountAvatar" :style='avatarDiv'/>
      <div class="accountInfo">
        <div style="margin:20px;">
          <span>Account: </span>
          <el-button type="primary" v-text="this.$store.state.account"></el-button>
        </div>
        <div style="margin:20px;">
          <span>Balance: </span>
          <el-tooltip class="item" effect="light" v-bind:content="parseInt(this.balance) / 1000000000000000000 + ' eth'" placement="right">
            <el-button type="danger">{{balance}}</el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="record userInfo" id="record">
      <h1>交易记录</h1>
      <el-table
        v-loading="tLoading"
        :data="txs"
        stripe
        style="width: 100%">
        <el-table-column
          width="200px"
          label="Date">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 5px">{{ scope.row.timestamp }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="From">
          <template slot-scope="scope">
            <el-button type="danger">{{ scope.row.from }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="To">
          <template slot-scope="scope">
            <el-button type="success">{{ scope.row.to }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="Value (eth)"
          width="100px">
          <template slot-scope="scope">
            <el-button type="info">{{ scope.row.value }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comment userInfo" id="comment">
      <h1>我的评论</h1>
      <el-table
        v-loading="cLoading"
        :data="comData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="Date"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="From"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="To">
        </el-table-column>
        <el-table-column
          prop="address"
          label="To">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { address, FacABI, ComABI } from './../util/constract'
import { getTransactionsByAddr } from './../util/getTransactionsByAddr'

export default {
  data () {
    this.loading = true
    this.tLoading = true
    this.cLoading = true
    return {
      balance: '0 wei',
      avatarDiv: {
        backgroundImage: 'url(' + require('./../assets/avatar.jpg') + ')',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        outline: 'none'
      },
      txs: [],
      comData: []
    }
  },
  mounted () {
    var _this = this
    this.$web3.eth.getBalance(this.$store.state.account, (err, result) => {
      this.loading = false
      if (err) {
        this.$message({
          message: '未知错误，稍后重试',
          showClose: true,
          type: 'error'
        })
      } else {
        this.balance = result + ' wei'
      }
    })

    getTransactionsByAddr(this.$web3, this.$store.state.account).then(
      function (result) {
        _this.txs = result
        _this.tLoading = false
      }
    )
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

.userInfo {
  width: 80%;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 50px;
  vertical-align: middle;
  text-align: left;
}

.accountAvatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 100px;
  margin-left: 100px;
  margin-top: 8px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  float: left;
}

.accountInfo {
  float: left;
  margin: 40px;
}
</style>
