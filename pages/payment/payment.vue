<template>
  <view class="content">
    <view class="unit1">
      <text>{{ tableid[0] }}</text>
      <text>{{ tableid[1] }}</text>
    </view>
    <view class="unit2">
      <view style="font-size: 20px;margin-bottom:14px;">支付金额</view>
      <view style="font-size:30px;color:#f4461c">¥{{pay}}</view>
      <view style="font-size:12px;color:#c1c1c1">支付剩余时间</view>
    </view>

    <Paytype @change="btnchange" class="unit3"></Paytype>

    <view class="unit4">
      <u-button shape="circle" type="error" @click="pays">确定支付</u-button>
    </view>
  </view>
</template>

<script>
import paytype from '../../components/i-pay-type/i-pay-type'
export default {
  name: "payment",
  data() {
    return {
      tableid:'',
      xsdbh:'',//订单号
      token: '',
      readytopays:'',
      pay:0,
      payment:''
    }
  },
  components: {
    paytype
  },
  onLoad(options) {
    this.tableid=uni.getStorageSync('tableid'),
        this.xsdbh=uni.getStorageSync('xsdbh'),//订单号
        this.token=uni.getStorageSync('token'),
        this.readytopays=uni.getStorageSync('readytopays')
        this.pay=parseInt(this.readytopays.paytotal).toFixed(2)
  },
  methods: {
btnchange(index){
  this.payment=index
},
    pays() {
  if(this.payment=='0'){
    console.log('微信支付')
    // this.$u.api.pays({
    //   access_token: this.token,
    //   flow_no: this.xsdbh,//订单号
    //   payno: "04",//收款方式
    //   total: this.readytopays.paytotal*100,//应收总金额，分
    //   payid: "",//付款码
    //   paymm: "00268",//收银员编号
    //   verifycode: this.readytopays.vipid,//会员号
    //   flag: {
    //     regcode:'',//注册码
    //     mz_openid:'',
    //     FDBH:uni.getStorageSync('fdbh'),//分店
    //     act_list_json: '',//活动商品列表Json字符串，从预结算接口获取
    //     POSID:'00268',//收银机编号
    //     ActMack:"SELFPORT"+uni.getStorageSync('fdbh') ,//微信优惠券标志，构成规则："SELFPORT"+门店编号,例如：SELFPORT0099
    //     ystflowid:'' ,//赢商通请求流水，一般为空
    //     sub_openid:''// 相对商户的openid，一般为空
    //   }
    // }).then(res => {
    //   console.log('付款：',res)
    //   uni.requestPayment({
    //     provider: 'wxpay',
    //     timeStamp: String(Date.now()),
    //     nonceStr: Math.random().toString(36).slice(-16),//随机字符串
    //     package: 'prepay_id=',//统一下单接口返回的 prepay_id 参数值
    //     signType: 'MD5',
    //     paySign: '',//签名
    //     success: function (res) {
    //       console.log('success:' + JSON.stringify(res));
    //     },
    //     fail: function (err) {
    //       console.log('fail:' + JSON.stringify(err));
    //     }
    //   });
    // })

    var snvar = wx.getStorageSync('companyid');             //商家SN
    var fdbhvar = wx.getStorageSync('fdbh');         //分店编号
    wx.request({
      url: 'https://lite.ecsun.cn/api/init/'+snvar+'-'+fdbhvar,
      data: {
      },
      method: 'GET',
      dataType: 'json',
      success: function (ress) {
        console.info(ress);
        if (ress.data.result == "success") {
          wx.setStorageSync('subappid', ress.data.wxpaylist.appid);       //商家公众号子appid
          wx.setStorageSync('submchid', ress.data.wxpaylist.submchid);    //商家支付子商户号
        }
        else {
          console.log(ress.data.message);
        }
      },
      fail: function (error) {
        console.info("获取门店初始信息失败");
        console.info(error);
      }
    });

    var appidvar = wx.getStorageSync('appid');              //小程序appid
    var openidvar = wx.getStorageSync('openid');            //小程序openid
    var submchidvar = wx.getStorageSync('submchid');        //商家支付子商户号
    var billnumvar = wx.getStorageSync('xsdbh');          //本次交易订单号
    var total_feevar = wx.getStorageSync('readytopays').paytotal;       //本次交易应付总额
    var cardidvar = wx.getStorageSync('cardid');            //会员线下会员号

    wx.request({                                                //请求支付必要参数，发起预支付请求
      url: 'https://wx.ecsun.cn/AjacService/LiteReadyToPay2.ashx',
      data: {
        subappid: appidvar,
        openid: openidvar,
        submchid: submchidvar,
        billnum: billnumvar,
        total_fee: total_feevar,
         cardid: cardidvar||'',
        nums: Math.random()
      },
      method: 'GET',
      dataType: 'json',
      success: function (ress) {
        console.info(ress);

        wx.requestPayment(                                       //调用微信支付
            {
              'timeStamp': ress.data.timeStamp,
              'nonceStr': ress.data.nonceStr,
              'package': ress.data.package,
              'signType': 'MD5',
              'paySign': ress.data.paySign,
              'success': function (res) {
                console.log('支付成功:',res);
                //支付成功，立刻调用查单接口查询订单在后台是否成功
                this.$u.api.paydones({
                  access_token:uni.getStorageSync('token'),
                  flow_no:uni.getStorageSync('xsdbh'),
                  payno:'04',
                  total:uni.getStorageSync('readytopays').paytotal,
                  payid:'',
                  syyid:uni.getStorageSync('openid'),
                  fdbh:uni.getStorageSync('fdbh'),
                  companyid:uni.getStorageSync('companyid')
                }).then((res)=>{
                  console.log('订单完成',res)
                })

              },
              'fail': function (res) {
                console.log('支付失败:',res);
              },
              'complete': function (res) { }
            })

      },
      fail: function (error) {

        console.info("准备支付失败");
        console.info(error);

      }
    });

              }
  if(this.payment=='1'){
    console.log('支付宝支付')
  }
  if(!this.payment){
    uni.showToast({
      title: '请选择支付方式',
      icon: 'loading',
      duration: 1000
    });
  }
}

  }
}


</script>

<style lang="scss">
page {
  background: url(../../static/main/dt.png) no-repeat;
  background-size: contain;
  background-color: #f3f2f4;

}

.content {
  display: flex;
  flex-direction: column;
  margin: 150rpx 20rpx 0 20rpx;
  position: relativee;

  .unit1 {
    border: 2rpx #ccc;
    border-radius: 40rpx;
    box-shadow: 2rpx 2rpx 4rpx #ccc;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;

    text {
      font-size: large;
    }
  }

  .unit2 {
    margin-top: 20rpx;
    border: 2rpx solid #ccc;
    border-radius: 40rpx;
    box-shadow: 2rpx 2 rpx 4rpx #ccc;
    background-color: #fff;
    height: 300rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .unit3 {
    margin-top:100rpx;
  }

  .unit4 {
    position: absolute;
    bottom: 30rpx;
    right: 30rpx;
    left: 30rpx;


  }
}


</style>