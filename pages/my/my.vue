<template>
  <view class="content">
    <view class="unit1" >
      <image :src="userInfo.avatarUrl"></image>
      <view class="unit1box">
        <view class="unit1box_text">
          <u-button type="success" @click="login" v-if="!islogin">微信授权登录</u-button>
          <text style="font-size:20px" v-if="islogin">{{userInfo.nickName}}</text>
        </view>
        <view class="unit1box_code">
          <u-icon name="scan" size="30px" @click="scan"></u-icon>
        </view>
      </view>
    </view>
<view class="unit2">
  <view class="unit2_top">
    <view class="unit2_top_left">
      <image src="../../static/main/LOGO.png" style="height: 80rpx; width:80rpx;border-radius: 50%"></image>
      <text>麦子会员</text>
    </view>
    <view class="unit2_top_right">
      <u-button @click="vip" type="warning" size="mini" style="padding-right: 20rpx;">立即入会</u-button>
    </view>
  </view>
  <view style="font-size: 20px;margin-top:10px;">我的资产</view>
  <view class="unit2_bottom">
   <view class="unit2_bottom_item">
     <text style="font-size:16px;color: red;margin:0 0 20rpx 0">20</text>
     <view>我的积分</view>
   </view>
    <view class="unit2_bottom_item">
      <text style="font-size:16px;color: red;margin:0 0 20rpx 0">0</text>
      <view>我的卡卷</view>
    </view>
    <view class="unit2_bottom_item">
    <text style="font-size:16px;color: red;margin:0 0 20rpx 0">0.00</text>
    <view>我的余额</view>
  </view>
  </view>
</view>

    <view class="unit3">
      <navigator class="unit3Nav" url="/pages/vip/vip">
          <image src="../../static/main/hy.png"></image>
          <text>我的会员</text>
      </navigator>
      <navigator class="unit3Nav" url="/pages/roll/roll">
          <image src="../../static/main/kj.png"></image>
          <text>红包卡卷</text>
      </navigator>
      <navigator class="unit3Nav" url="/pages/order/order" open-type="switchTab">
          <image src="../../static/main/dt.png"></image>
          <text>我的订单</text>
      </navigator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      islogin: false,
      userInfo: {}
    }
  },
  onLoad:function(){

},
  onShow:function(){
  },
  methods: {
    //用户登录
     login(){
       uni.login({
         provider: 'weixin',
         success:  (res)=> {
           uni.setStorageSync('code', res.code)
           this.$u.api.userchecks({
             userid:'00005',
             computerid:'aa309815'
           }).then((res)=>{
             console.log('用户验证成功：',res)
              this.$u.api.logins({
                vtype:'login',
                companyid:uni.getStorageSync('companyid'),
                userid:'00276',
                password:'1234567',
                fdbh:uni.getStorageSync('fdbh'),
                computerid:'aa309815',
                ipaddress:'192.168.31.162'
              }).then((res)=>{
                console.log('登录成功:',res)
              })
           })
         },
         fail:(err)=>{
           console.log('登录失败:',err)
       }
       });
       // uni.getProvider({
       //   service: 'oauth',
       //   success: function (res) {
       //     if (~res.provider.indexOf('weixin')) {
       //       uni.login({
       //         provider: 'weixin',
       //         success: (loginRes)=> {
       //           console.log(JSON.stringify(loginRes));
       //         }
       //       });
       //     }
       //   }
       // });
  //获取信息
  uni.getUserProfile({
    desc:"获取用户信息",
    success: (res)=>{
      console.log(res)
      this.userInfo=res.userInfo
      this.islogin=true
    }
  })
},
    //扫码
    scan(){
      uni.scanCode({
        success: function (res) {
          console.log('条码类型：' + res.scanType);
          console.log('条码内容：' + res.result);
        }
      });
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
  margin: 50rpx 20rpx 0 20rpx;

  .unit1 {
    display: flex;
    justify-content: content;
    height: 200rpx;
    width: 100%;
    align-items: center;
    image {
      width: 140rpx;
      height: 140rpx;
       margin:20rpx;
      border-radius: 50%;
    }
    .unit1box {
      flex: 1;
      display: flex;
      margin-left: 20rpx;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      .unit1box_text {
        display: flex;
        flex-direction: column;
      }
      .unit1box_code{
        display: flex;
        align-items: center;
        margin-right: 20rpx;
      }
    }
  }
  .unit2{
    margin-top:50rpx;
    height: 350rpx;
    border:2rpx solid #ccc;
    border-radius: 20rpx;
    box-shadow: 1rpx 5rpx 5rpx #ccc;
    background-color: #fff;
    width:100%;
    .unit2_top{
      background-color: #e7d2a9;
      border-radius:20rpx;
      height:120rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .unit2_top_left{
        display: flex;
         align-items: center;
        image{
          margin:5rpx 10rpx 5rpx 5rpx;
        }
        }
    }
    .unit2_bottom{
      display: flex;
      margin-top: 20rpx;
      .unit2_bottom_item{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

      }
    }
  }
  .unit3{
    height:200rpx;
    display: flex;
    margin-top: 100rpx;
    border:2rpx  #ccc;
    border-radius: 20rpx;
    box-shadow: 2rpx 2rpx 4rpx #ccc;
    background-color: #fff;
    .unit3Nav{
      flex:1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      image{
        width:80rpx;
        height:80rpx;
      }
    }
  }
}

</style>
