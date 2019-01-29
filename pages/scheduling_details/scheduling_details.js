// pages/Order details/Order details.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:'',
    timeindex: 0,
    timearray: [],
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
  onShow: function (){
    var that = this;
    var orderNo = app.orderNo;
    var orderStatus = app.orderStatus;
    that.setData({
      orderNo: orderNo,
      orderStatus: orderStatus,
    })
    wx.request({
      url: app.globalData.baseUrl + '/customerorder/detail/' + that.data.orderNo,
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        timestamp1 = new Date(res.data.data[0].serviceStartTime);
          y = timestamp1.getFullYear(),
          m = timestamp1.getMonth() + 1,
          d = timestamp1.getDate();
        var starttime = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + timestamp1.toTimeString().substr(0, 8);
        var starttimes = y + "年" + (m < 10 ? "0" + m : m) + "月" + (d < 10 ? "0" + d : d)+'日'
        that.setData({
          project: res.data.data[0],
          starttime:starttime,
          starttimes: starttimes
        })
      }
    });
  },
  regist_accept:function () {
    var that = this;
    wx.showModal({
      cancelColor:'#333333',
      confirmText:'确认',
      cancelText: '取消',
      content:'确定接受此项排班?',
      confirmColor:'#5489FD',
      success(res){
        if (res.confirm){
          wx.request({
            url: app.globalData.baseUrl + '/customerorderschedule/accept_schedule/' + that.data.orderNo,
            method: 'get',
            header:{
              'content-Type':'application/x-www-form-urlencoded',
              'auth-token': that.data.token
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 200){
                wx.setStorageSync('current',1)
                wx.showModal({
                  showCancel:false,
                  confirmText: '我知道了',
                  title: '您已接受此项排班，请于'+that.data.starttimes+'到所在病区服务',
                  confirmColor: '#5489FD',
                  success(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }
                  }
                })
              }else{
                wx.showToast({
                  title: '接受失败',
                  icon: 'none',
                  duration: 1500,
                  success(res) {
                    setTimeout(function () {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    }, 500);
                  }
                })
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  regist_pass: function () {
    var that = this;
    wx.showModal({
      cancelColor: '#333333',
      confirmText: '确认',
      cancelText: '取消',
      content: '真的要拒绝此项排班吗?',
      confirmColor: '#5489FD',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + '/customerorderschedule/refused_schedule/' + that.data.orderNo,
            method: 'get',
            header: {
              'content-Type': 'application/x-www-form-urlencoded',
              'auth-token': that.data.token
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 200) {
                wx.showToast({
                  title: '已拒绝',
                  icon: 'success',
                  duration:1500,
                  success(res){
                   setTimeout(function () {
                      wx.switchTab({
                        url: '../index/index',
                      })
                    },2000);
                  }
                })
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('index---------onHide()')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorage({
      key:'serviceStaffId'
    })
    wx.removeStorage({
      key: 'nurse_name',
    })
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