// pages/mine/mine.js
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    show:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      token: wx.getStorageSync('token'),
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
  onShow: function () {
    var that=this;
    if (wx.getStorageSync('userInfo')){
      that.setData({
        show:false,
        userInfo: wx.getStorageSync('userInfo')
      })
    }else{
      that.setData({
        show:true
      })
    }
    wx.request({
      url: app.globalData.baseUrl + '/inststaff/get_id',
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
         that.setData({
           info:res.data.data
         })
      }
    });
  },
  getUserInfo: function (e) {
    var that = this;
      wx.getUserInfo({
        lang: "zh_CN",
        success: res => {
        wx.setStorageSync('userInfo', res.userInfo)
        that.setData({
          userInfo:res.userInfo,
          show:false,
        })
        }
      })
  },
  click_details:function(){
     wx.navigateTo({
       url: '../personal_information/personal_information',
     })
  },
  click_order:function(){
    wx.navigateTo({
      url: '../my_order/my_order',
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