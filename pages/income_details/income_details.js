// pages/Order details/Order details.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token')
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var orderNo = app.orderNo;
    var days = app.days;
    that.setData({
      orderNo: orderNo,
      days: days,
    })
    wx.request({
        url: app.globalData.baseUrl + '/customerorder/detail/' + orderNo,
        method: 'get',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
          'auth-token': that.data.token
        },
        success: function (res) {
          console.log(res)
          if (res.data.data[0].orderAmt % 1 === 0) {
            that.setData({
              xshow: true
            })
          } else {
            that.setData({
              xshow: false
            })
          }
          that.setData({
            project: res.data.data[0],
          })
        }
      });
    wx.request({
      url: app.globalData.baseUrl + '/customerorderschedule/all_schedule/' +orderNo,
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        var timestamp3 = [];
        for (var i = 0; i < res.data.data.length; i++) {
          timestamp3.push(new Date(res.data.data[i].serviceStartTime));
          var arr1 = [];
          var arr3 = [];
          for (var j = 0; j < timestamp3.length; j++) {
            y = timestamp3[j].getFullYear(),
              m = timestamp3[j].getMonth() + 1,
              d = timestamp3[j].getDate();
            arr1.push(y + "." + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d));      
            arr3.push(timestamp3[j].toTimeString().substr(0, 8))
          }
        }
        var timestamp4 = [];
        for (var i = 0; i < res.data.data.length; i++) {
          timestamp4.push(new Date(res.data.data[i].serviceEndTime));
          var arr2 = [];
          var arr4 = [];
          for (var j = 0; j < timestamp4.length; j++) {
            y = timestamp4[j].getFullYear(),
              m = timestamp4[j].getMonth() + 1,
              d = timestamp4[j].getDate();
            arr2.push(y + "." + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d));
            arr4.push(timestamp4[j].toTimeString().substr(0, 8))
          }
        }
        that.setData({
          serviceinfo: res.data.data,
          arr1: arr1,
          arr2: arr2,
          arr3: arr3,
          arr4: arr4
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})