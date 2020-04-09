//index.js
const app = getApp()
Page({
  data: {
    ColorList: [
      {
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      }
    ],
    showDialog: false,
    dateTime: 'TIME',
    food: '空',
    buttonText: '开始',
    inputValue: '',
    timer: '',
    foodArr: [
      '面条', '炒饼', '粥'
    ]
  },
  onLoad () {
    Date.prototype.format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 -         RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :            (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    }
    let dateTime = new Date().format("yyyy-MM-dd hh:mm:ss");
    this.setData({
      dateTime: dateTime
    })
    setInterval(() => {
      dateTime = new Date().format("yyyy-MM-dd hh:mm:ss");
      this.setData({
        dateTime: dateTime
      })
    }, 1000);
  },
  action () {
    let text = this.data.buttonText
    var timer = null
    let num = 0
    if (text === '开始') {
      this.setData({
        buttonText: '结束'
      })
      this.data.timer = setInterval(() => {
        num++
        if (num === this.data.foodArr.length) num = 0
        this.setData({
          food: this.data.foodArr[num]
        })
      }, 100);
    } else {
      clearInterval(this.data.timer)
      this.setData({
        buttonText: '开始'
      })
    }
  },
  custom () {
    wx.showModal({
      title: "想吃什么以'、'分隔输入, 例如‘鱼香肉丝、宫保鸡丁’",
      content: '模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog,
      inputValue: this.data.foodArr.join('、')
    });
  },
  inputChange (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  confirm () {
    let arr = this.data.inputValue.split('、')
    let arrBackup = []
    arr.forEach((item) => {
      if (item) {
        console.log(item)
        arrBackup.push(item)
      }
    })
    this.setData({
      foodArr: arrBackup
    })
    this.setData({
      showDialog: false
    })
  },
  cancle () {
    this.setData({
      showDialog: false
    })
  }
})
