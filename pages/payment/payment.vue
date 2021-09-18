<template>
  <view class="content">
    <view class="unit1">
      <text>{{ desk[0] }}</text>
      <text>{{ desk[1] }}</text>
    </view>
    <view class="unit2">
      <view style="font-size: 20px;margin-bottom:14px;">支付金额</view>
      <view style="font-size:30px;color:#f4461c">¥{{ price }}</view>
      <view style="font-size:12px;color:#c1c1c1">支付剩余时间</view>
    </view>
    <view class="unit3">
     <radio-group @change="radioChange" class="unit3box">
       <view class="unit3box_left">
         <image src='../../static/pay/微信.png' style="height: 40rpx;width:40rpx;padding-right: 10rpx"></image>
         <view>微信支付</view>
       </view>
         <radio class="radio" checked=true></radio>
     </radio-group>
    </view>
    <view class="unit4">
      <u-button shape="circle" type="error" @click="pay(Cart)">确定支付</u-button>
    </view>
  </view>
</template>

<script>
export default {
  name: "payment",
  data() {
    return {
      price: 0,
      desk: '',
      mode: ''
    }
  },
  onLoad(options) {
    this.desk=uni.getStorageSync('table');
    let Cart = uni.getStorageSync('Cart')
    this.price = Cart.cartprice
  },
  methods: {
    pay(Cart) {
      uni.setStorageSync('Cart', this.Cart)
      //支付功能
    }
  }
}


</script>

<style lang="scss">
page {
  background: url(../../static/main/顶部底图.png) no-repeat;
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
    margin-top: 80rpx;
    border-radius: 40rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    .unit3box{
      width:100%;
      display: flex;
      flex-direction:row;
      padding:20rpx;
      justify-content:space-between;
      .unit3box_left{
        display: flex;
        flex-direction: row;
      }
    }
  }

  .unit4 {
    position: absolute;
    bottom: 30rpx;
    right: 30rpx;
    left: 30rpx;


  }
}


</style>