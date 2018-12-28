// 获得某个地址相关的交易
var getTransactionsByAddr = async function (web3, account, startBlockNumber, endBlockNumber) {
  var all = []
  if (endBlockNumber == null) {
    endBlockNumber = await web3.eth.getBlockNumber()
  }
  if (startBlockNumber == null) {
    startBlockNumber = 0
  }
  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
    var block = await web3.eth.getBlock(i, true)
    if (block != null && block.transactions != null) {
      block.transactions.forEach(function (e) {
        if (e.from === null) e.from = ''
        if (e.to === null) e.to = ''
        // console.log(account, e.from, e.to)
        if (account === '*' || account.toLowerCase() === e.from.toLowerCase() || account.toLowerCase() === e.to.toLowerCase()) {
          e.value = web3.utils.fromWei(e.value.toString())
          e.timestamp = timeConverter(block.timestamp)
          all.push(e)
          // console.log(e)
        }
      })
    }
  }
  return all
}

// 时间转换 unix时间戳
function timeConverter (cTime) {
  var a = new Date(cTime * 1000)
  var year = a.getFullYear()
  var month = a.getMonth() + 1
  var date = a.getDate()
  var hour = a.getHours()
  var min = a.getMinutes()
  var sec = a.getSeconds()
  var time = year + '/' + month + '/' + date + ' ' + hour + ':' + min + ':' + sec
  return time
}

// 格式化日期,
function formatDate (str) {
  let oDate = new Date(str)
  let oYear = oDate.getFullYear()
  let oMonth = oDate.getMonth() + 1
  let oDay = oDate.getDate()
  let oHour = oDate.getHours()
  let oMin = oDate.getMinutes()
  let oSen = oDate.getSeconds()
  let oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' +
  addZero(oMin) + ':' + addZero(oSen)
  return oTime
}

// 补零操作
function addZero (num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}

export { getTransactionsByAddr, timeConverter, formatDate }
