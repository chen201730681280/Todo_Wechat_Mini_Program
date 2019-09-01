//index.js

//获取应用实例

var app = getApp()
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

Page({

  data: {

    imgUrls: [
      "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRcaISLHUAAaIAQtVJyoAAf_UAJK9e8ABogZ224.jpg",
      "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRciIK04QAAPSUiTmb7UAAf_UAJRfggAA9Jq257.jpg",

      "https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/01/01/ChMkJ1mhRciIGHuyAAIISdSwzIYAAf_UAJ1MKkAAghh731.jpg"

    ],

    indicatorDots: true,

    autoplay: true,

    interval: 5000,
    duration: 1000,

    scrollTop: 100,

    items: [],

    startX: 0,//开始坐标

    startY: 0,



  },

  //事件处理函数

  bindViewTap: function () {

    wx.navigateTo({

      url: '../logs/logs'

    })

  },



  onShow: function () {//显示日记

    var that = this

    var data = []

    wx.getStorage({

      key: 'note',

      success: function (res) {

        data = res.data;

        console.log(res.data)

        isTouchMove: false;

        data.reverse()

        that.setData({


          items: res.data

        })

      }

    })
    that.onLoad()

  },
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },


  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });

    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },

  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },


  //删除事件
  del: function (e) {

    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
    wx.setStorage({
      key: 'note',
      data: this.data.items.reverse()
    })

  },

  goWrite: function () {//跳到写日记的界面

    wx.navigateTo({

      url: '../write/write'

    })

  },

})
