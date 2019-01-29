// pages/manage/manage.js
var app=getApp();
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
  // 生命周期函数监听页面显示
  onShow: function () {
    var that=this;
    var dataArr = [];
    var newdata = new Date();
    y = newdata.getFullYear(),
    m = newdata.getMonth() + 1,
    newdata=y+'.'+(m < 10 ? "0" + m : m);
    newdata2 = y + '-' + (m < 10 ? "0" + m : m);
    var data = new Date();
    var year = data.getFullYear();
    data.setMonth(data.getMonth() + 1, 1)//获取到当前月份,设置月份
    for (var i = 0; i < 12; i++){
      data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
      var m = data.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      dataArr.push(data.getFullYear() + "." + (m))
    }
    that.setData({
      dataArray:dataArr,
      nowData: newdata,
      newdata2: newdata2
    })
    wx.request({
      url: app.globalData.baseUrl + '/customerorderschedule/order_statistics/'+newdata2,
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        if (res.data.data.totalAmt % 1 === 0 && res.data.data.totalAmt !== null) {
          that.setData({
            money: res.data.data.totalAmt + '.00',
            coupons: res.data.data
          })
        } else if (res.data.data.totalAmt==null){
          that.setData({
            money:0.00,
            coupons: res.data.data
          })
        } else {
          that.setData({
            money: res.data.data.totalAmt,
            coupons: res.data.data
          })
        }
      }
    });
    wx.request({
      url: app.globalData.baseUrl + '/customerorder/staff_income_count',
      method: 'post',
      data:{
        serviceEndTime:newdata2
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res){
        console.log(res)
        var timestamp1 = [];
        for (var i = 0; i < res.data.data.length; i++) {
          timestamp1.push((res.data.data[i].serviceTime) / 24);
        }
        that.setData({
          arr3: res.data.data,
          timestamp1: timestamp1
        })
      }
    });
  },
  clickDetails:function(e){
    var orderNo = e.currentTarget.dataset.orderno;
    var days = e.currentTarget.dataset.days;
    app.orderNo = orderNo;
    app.days = days;
    wx.navigateTo({
      url: '../income_details/income_details',
    })
  },
  bindTimeChange:function(e){
    var that=this;
    var dataArray=that.data.dataArray;
    var time = dataArray[e.detail.value]
    that.setData({
      nowData:time,
    })
    var time1 = time.substring(0,4);
    var time2 = time.substring(5,7);
    var time3=time1+'-'+time2;
    console.log(time1,time2,time3)
    wx.request({
      url: app.globalData.baseUrl + '/customerorderschedule/order_statistics/' + time3,
      method: 'get',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        if (res.data.data.totalAmt % 1 === 0 && res.data.data.totalAmt !== null) {
          that.setData({
            money: res.data.data.totalAmt + '.00',
            coupons: res.data.data
          })
        } else if (res.data.data.totalAmt == null) {
          that.setData({
            money: 0.00,
            coupons: res.data.data
          })
        } else {
          that.setData({
            money: res.data.data.totalAmt,
            coupons: res.data.data
          })
        }
      }
    });
    wx.request({
      url: app.globalData.baseUrl + '/customerorder/staff_income_count',
      method: 'post',
      data: {
        serviceEndTime: time3
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'auth-token': that.data.token
      },
      success: function (res) {
        console.log(res)
        var timestamp1 = [];
        for (var i = 0; i < res.data.data.length; i++) {
          timestamp1.push((res.data.data[i].serviceTime) / 24);
        }
        that.setData({
          arr3: res.data.data,
          timestamp1: timestamp1
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