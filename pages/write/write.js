//获取应用实例

var app = getApp()
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

Page({

  data: {

    content: ''

  },


  onShow: function () {

    wx.getStorage({

      key: 'note',

      fail: function (res) {

        wx.setStorage({

          key: 'note',

          data: []

        })

      }

    })

  },

  onLoad: function () {
    this.setData({
      logs: Y + "-" + M + "-" + D,
    })
  },


  bindContent: function (e) {

    this.setData({

      content: e.detail.value

    })

  },

  save: function (e) {

    var that = this

    var items = {

      content: that.data.content,
      date: Y + '-' + M + '-' + D,


    }

    var data = []

    wx.getStorage({

      key: 'note',

      success: function (res) {

        data = res.data;

        console.log(items)

        data.push(items);

        wx.setStorage({

          key: 'note',

          data: data,

          success: function () {

            wx.showModal({

              title: '保存成功',

              content: '确定之后去查看',

              success: function (res) {

                if (res.confirm) {

                  console.log('用户点击确定')

                  wx.navigateBack({

                    delta: 1

                  })

                }

              }

            })

          }

        })

      },

    })

  }

})