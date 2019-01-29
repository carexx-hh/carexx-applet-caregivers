// pages/order/order.js
const util = require('../../utils/util.js')
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchtab: [
    {
        name: '待接受',
    },
    {
      name: '进行中',
    }
    ],
    current:0,
    coupons:[],
    show:false
  },
  /**
   * 生命周期函数--监听页面加载
   */// 142202199710273329
  onLoad: function (options) {
    var that = this;
  },
  switchNav: function (e){
    var that = this;
    var index = e.target.dataset.index;
    wx.setStorageSync('current', index)
    that.setData({
        current: index
    },function(){
      if(that.data.current==0){
        wx.request({
          url: app.globalData.baseUrl + '/customerorder/by_orderStatus_and_serviceStatus',
          method: 'post',
          data: {
            serviceStatus: 3
          },
          header: {
            'content-Type': 'application/x-www-form-urlencoded',
            'auth-token': wx.getStorageSync('token')
          },
          success: function (res) {
            console.log(res)
            if (res.data.data.length == 0){
              that.setData({
                show: true
              })
            }else{
              that.setData({
                show: false
              })
            }
            var timestamp = [];
            for (var i = 0; i < res.data.data.length; i++) {
              timestamp.push(new Date(res.data.data[i].createTime));
              var arr = [];
              for (var j = 0; j < timestamp.length; j++) {
                  y = timestamp[j].getFullYear(),
                  m = timestamp[j].getMonth() + 1,
                  d = timestamp[j].getDate();
                arr.push(y + '.' + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d));
              }
            }
            var newtime = new Date().toDateString()
            that.setData({
              coupons: res.data.data,
              time: arr,
            })
          }
        });
      } else if (that.data.current == 1){
        wx.request({
          url: app.globalData.baseUrl + '/customerorder/staff_by_orderStatus_and_serviceStatus',
          method: 'post',
          data: {
            orderStatus: 4,
            serviceStatus: 1
          },
          header: {
            'content-Type': 'application/x-www-form-urlencoded',
            'auth-token': wx.getStorageSync('token')
          },
          success: function (res) {
            console.log(res)
            if (res.data.data.length == 0) {
              that.setData({
                show: true
              })
            } else {
              that.setData({
                show: false
              })
            }
            var timestamp = [];
            for (var i = 0; i < res.data.data.length; i++) {
              timestamp.push(new Date(res.data.data[i].createTime));
              var arr = [];
              for (var j = 0; j < timestamp.length; j++) {
                y = timestamp[j].getFullYear(),
                  m = timestamp[j].getMonth() + 1,
                  d = timestamp[j].getDate();
                arr.push(y + '.' + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d));
              }
            }
            var newtime = new Date().toDateString()
            that.setData({
              coupons: res.data.data,
              time: arr,
            });
      }
    });
  }
  })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // 待接收：4 3 2
  // 进行中： 4 1 2
  onShow: function () {
    var that = this;
    wx.login({
      success: res =>{
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: app.globalData.baseUrl + '/auth/caregivers_login',
            method: 'POST',
            data: {
              code: res.code,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            success: function (res) {
              console.log(res)
              wx.setStorageSync('openId', res.data.data.openId)
              if (res.data.data.certificationStatus == 2){
                wx.setStorage({
                  key: 'token',
                  data: res.data.data.token,
                  success(res){
                    if (!wx.getStorageSync('current')||wx.getStorageSync('current')==0){
                      that.setData({
                        current: 0
                      })
                    wx.request({
                      url: app.globalData.baseUrl + '/customerorder/by_orderStatus_and_serviceStatus',
                      method: 'post',
                      data: {
                        serviceStatus:3
                      },
                      header: {
                        'content-Type': 'application/x-www-form-urlencoded',
                        'auth-token': wx.getStorageSync('token')
                      },
                      success: function (res) {
                        console.log(res)
                        if (res.data.data.length==0){
                          that.setData({
                            show:true
                          })
                        }
                        var timestamp = [];
                        for (var i = 0; i < res.data.data.length; i++) {
                          timestamp.push(new Date(res.data.data[i].createTime));
                          var arr = [];
                          for (var j = 0; j < timestamp.length; j++) {
                            y = timestamp[j].getFullYear(),
                              m = timestamp[j].getMonth() + 1,
                              d = timestamp[j].getDate();
                            arr.push(y + '.' + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d));
                          }
                        }
                        that.setData({
                          coupons: res.data.data,
                          time: arr,
                        })
                      }
                    });
                    }else if(wx.getStorageSync('current') && wx.getStorageSync('current') == 1) {
                      that.setData({
                        current:1
                      })
                      wx.request({
                        url: app.globalData.baseUrl + '/customerorder/staff_by_orderStatus_and_serviceStatus',
                        method: 'post',
                        data: {
                          orderStatus: 4,
                          serviceStatus: 1
                        },
                        header: {
                          'content-Type': 'application/x-www-form-urlencoded',
                          'auth-token': wx.getStorageSync('token')
                        },
                        success: function (res) {
                          console.log(res)
                          if (res.data.data.length == 0) {
                            that.setData({
                              show: true
                            })
                          }
                          var timestamp = [];
                          for (var i = 0; i < res.data.data.length; i++) {
                            timestamp.push(new Date(res.data.data[i].createTime));
                            var arr = [];
                            for (var j = 0; j < timestamp.length; j++) {
                              y = timestamp[j].getFullYear(),
                                m = timestamp[j].getMonth() + 1,
                                d = timestamp[j].getDate();
                              arr.push(y + '.' + (m < 10 ? "0" + m : m) + "." + (d < 10 ? "0" + d : d));
                            }
                          }
                          that.setData({
                            coupons: res.data.data,
                            time: arr,
                          })
                        }
                      });
                    }
                  }
                })
              } else {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            },
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  clickDetails: function(e){
    var that=this;
    var orderNo = e.currentTarget.dataset.orderno
    app.orderNo = orderNo; 
    var orderStatus = e.currentTarget.dataset.orderstatus
    app.orderStatus = orderStatus;
    wx.setStorageSync('current', that.data.current)
    wx.navigateTo({
      url: '../scheduling_details/scheduling_details',
    })
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