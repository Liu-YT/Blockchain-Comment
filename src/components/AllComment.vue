<template>
  <div class="commentPage">
    <el-table
      :data="object.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      :default-sort = "{prop: 'ctime', order: 'descending'}"
      style="width:100%;margin:0 auto;"
      @expand-change='handleExpand' >
      <el-table-column
        prop="children"
        type="expand">
        <template slot-scope="scope">
          <el-table
            v-loading='scope.row.loading == null ? true : false'
            :data="scope.row.children"
            style="width: 100%">
             <el-table-column width="200" label="评论时间">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 5px">{{ scope.row.ctime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评论">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <el-tag type="info">{{ scope.row.name }}</el-tag>
                  <p></p>
                  <el-tag type="success">{{ scope.row.comment }}</el-tag>
                  <div slot="reference" class="name-wrapper">
                    <el-button type="info">{{ scope.row.comment }}</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column width="200" label="评价">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.score"
                  disabled
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="wei" placement="top">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handlePay(scope.$index, scope.row)">赞赏</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column width="200" prop='ctime'>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 5px">{{ scope.row.ctime }}</span>
        </template>
      </el-table-column>
      <el-table-column width="100">
        <template slot-scope='scope'>
          <el-tag >{{ scope.row.theme }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width='800'>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            标题 <el-tag type="info">{{ scope.row.name }}</el-tag>
            <p></p>
            发起人 <el-tag type="success">{{ scope.row.owner }}</el-tag>
            <div slot="reference" class="name-wrapper">
              <el-button type="primary">{{ scope.row.name }}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width='100'>
        <template slot-scope="scope">
          <el-badge v-bind:value='scope.row.num' :max="10" class="item">
            <el-button size="small">回复</el-button>
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column width='100'>
        <template slot-scope="scope">
          <el-tooltip class="item" effect="light" content="评论" placement="top">
            <el-button type="info" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
        style="margin-right:100">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="max"
            placeholder="输入关键字搜索"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="评论" prop="comment" :label-width="formLabelWidth" >
          <el-input v-model="ruleForm1.comment" autocomplete="off" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="评价" prop="score" :label-width="formLabelWidth">
          <div class="block">
            <el-rate
              v-model="ruleForm1.score"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </div>
        </el-form-item>
         <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
            <el-button type="danger" disabled>{{ address }}</el-button>
         </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('')">取 消</el-button>
        <el-button type="primary" @click="handleAdd" :loading='clogining'>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { FacABI, ComABI, address } from '../util/constract'
import { formatDate } from './../util/getTransactionsByAddr'

export default {
  data () {
    return {
      address: '',
      search: '',
      dialogFormVisible: false,
      title: '',
      ruleForm1: {
        comment: '',
        score: null
      },
      object: [],
      clogining: false,
      formLabelWidth: '50px',
      rules: {
        comment: [
          {required: true, message: '请输入评论', trigger: 'blur'}
        ],
        score: [
          {required: true, message: '请给出一定的评价', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleExpand (row, expandedRows) {
      if (this.$store.state.account === '') {
        this.$message({
          message: '请先登陆再操作',
          showClose: true,
          type: 'error'
        })
        return
      }
      let _this = this
      this.$web3.eth.personal.unlockAccount(this.$store.state.account, this.$store.state.password).then(
        function (result) {
          if (result) {
            try {
              var fac = new _this.$web3.eth.Contract(ComABI, row.address)
              fac.methods.getAllComments()
                .call({from: _this.$store.state.account})
                .then(
                  function (result) {
                    row.children.length = 0
                    result.forEach(element => {
                      if (element.ctime === '') element.ctime = '0'
                      element.score = parseInt(element.score)
                      element.ctime = formatDate(parseInt(element.ctime))
                      row.children.push(element)
                    })
                    row.loading = false
                  }
                )
                .catch(
                  function (err) {
                    row.loading = false
                    console.log(err)
                    _this.$message({
                      message: '获取信息异常',
                      type: 'err',
                      showClose: true
                    })
                  }
                )
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
    },
    handleEdit (index, row) {
      if (this.$store.state.account === '') {
        this.$message({
          message: '请先登陆再操作',
          showClose: true,
          type: 'error'
        })
        return
      }
      console.log(index, row)
      this.ruleForm1.comment = ''
      this.ruleForm1.score = 0
      this.dialogFormVisible = true
      this.title = '回复： ' + row.name
      this.address = row.address
    },
    handleAdd () {
      if (this.$store.state.account === '') {
        this.$message({
          message: '请先登陆再操作',
          showClose: true,
          type: 'error'
        })
        return
      }
      this.clogining = true
      let _this = this
      this.$refs.ruleForm1.validate((valid) => {
        if (valid && this.ruleForm1.score !== 0) {
          this.$web3.eth.personal.unlockAccount(this.$store.state.account, this.$store.state.password).then(
            function (result) {
              if (result) {
                try {
                  var fac = new _this.$web3.eth.Contract(ComABI, _this.address)
                  fac.methods.setComment(_this.$store.state.account, _this.ruleForm1.comment, _this.ruleForm1.score.toString(), String(Date.parse(new Date())))
                    .send({from: _this.$store.state.account, gas: '3000000'})
                    .then(
                      function (err, result) {
                        console.log(err)
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
                        _this.dialogFormVisible = false
                        console.log(err)
                        _this.$message({
                          message: '余额不足',
                          type: 'err',
                          showClose: true
                        })
                      }
                    )
                  _this.clogining = false
                  _this.dialogFormVisible = false
                  _this.$message({
                    message: '新建成功，正在被确认',
                    type: 'success',
                    showClose: true
                  })
                } catch (err) {
                  _this.dialogFormVisible = false
                  console.log(err)
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
          this.clogining = false
          this.$message({
            message: '请完成必要的信息输入',
            type: 'error',
            showClose: true
          })
        }
      })
    },
    resetForm (formName) {
      this.dialogFormVisible = false
      this.$refs.ruleForm1.resetFields()
    },
    sort () {
      this.object.sort((a, b) => {
        return a.ctime < b.ctime
      })
    },
    handlePay (index, row) {
      console.log(index, row)
      let _this = this
      this.$prompt('赞赏 - ' + row.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[1-9]\d*(\.\d+)?$/,
        inputErrorMessage: '赞赏金额需要大于0且只能为数字'
      }).then(({ money }) => {
        this.$web3.eth.personal.unlockAccount(_this.$store.state.account, this.$store.state.password).then(
          function (result) {
            if (result) {
              try {
                _this.$web3.eth.sendTransaction({from: _this.$store.state.account, to: row.name, value: money})
                  .then(
                    function (err, result) {
                      console.log(err, result)
                      _this.$notify({
                        title: '提示',
                        message: '赞赏成功\t' + row.name,
                        type: 'success',
                        duration: 0,
                        offset: 100
                      })
                    }
                  )
                  .catch(
                    function (err) {
                      console.log(err)
                      _this.$message({
                        message: '余额不足',
                        type: 'err',
                        showClose: true
                      })
                    }
                  )
                _this.$message({
                  message: '新建交易成功，正在被确认',
                  type: 'success',
                  showClose: true
                })
              } catch (err) {
                console.log(err)
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    }
  },
  mounted () {
    let _this = this
    let fac = new this.$web3.eth.Contract(FacABI, address)
    fac.methods.getAllContracts().call().then(
      function (result) {
        for (let i = 0; i < result.length; ++i) {
          let com = new _this.$web3.eth.Contract(ComABI, result[i])
          com.methods.getObjectInfo().call()
            .then((info) => {
              info.address = result[i]
              info.ctime = formatDate(parseInt(info.ctime))
              info.children = []
              _this.object.push(info)
            })
            .catch((e) => {
              console.log(e)
            })
        }
      }
    )
  }
}
</script>
<style>
.item {
  margin-top: 10px;
}
</style>
