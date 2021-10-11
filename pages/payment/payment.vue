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
      payment:'0'
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
    this.$u.api.pays({
      access_token: this.token,
      flow_no: this.xsdbh,//订单号
      payno: "04",//收款方式
      total: '',//应收总金额，分
      payid: "",//付款码
      paymm: "{$syyid}",//收银员编号
      verifycode: "{$vipid}",//会员号
      flag: {
        regcode:'',//注册码
        mz_openid:'',
        FDBH:'',//分店
        act_list_json: '',//活动商品列表Json字符串，从预结算接口获取
        POSID:'',//收银机编号
        ActMack:'' ,//微信优惠券标志，构成规则："SELFPORT"+门店编号,例如：SELFPORT0099
        ystflowid:'' ,//赢商通请求流水，一般为空
        sub_openid:''// 相对商户的openid，一般为空
      }
    }).then(res => {
      console.log('付款：',res)
    })
  }else{
    console.log('支付宝支付')
  }}

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