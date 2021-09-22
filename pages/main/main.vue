<template>
  <view id="content">
    <!-- 店铺 -->
    <view class="unit1">
      <image mode="" src="../../static/main/LOGO.png" style="width: 150rpx;height: 150rpx;"></image>
      <view class="unit1_text">
        <text class="name">麦子旗航店</text>
        <text>天府新谷主店</text>
      </view>
    </view>
    <!--    会员-->

    <view class="unit2">
      <navigator class="unit2Nav" url="/pages/vip/vip">
        <view class="unit2_box">
          <image class="unit2_img" src="../../static/main/我的会员.png"></image>
          <text>我的会员</text>
        </view>
      </navigator>
      <navigator class="unit2Nav" url="/pages/roll/roll">
        <view class="unit2_box">
          <image class="unit2_img" src="../../static/main/红包卡卷.png"></image>
          <text>红包卡卷</text>
        </view>
      </navigator>
      <navigator class="unit2Nav" url="/pages/order/order" open-type="switchTab">
        <view class="unit2_box">
          <image class="unit2_img" src="../../static/main/我的订单.png"></image>
          <text>我的订单</text>
        </view>
      </navigator>
    </view>
    <!--    点餐-->
    <text>开始点餐</text>
    <view class="unit3">
      <navigator class="unit3Nav" url="/pages/menu/menu" open-type="switchTab" @click="navmenu">
        <view class="unit3_box">
          <image src="../../static/main/堂食点餐.png" class="unit3_img"></image>
          <text class="unit3_name">堂食点餐</text>
          <text>在线点单不排队</text>
        </view>
      </navigator>
      <navigator class="unit3Nav" url="/pages/menu/menu" open-type="switchTab" @click="navbesides">
        <view class="unit3_box">
          <image src="../../static/main/img.png" class="unit3_img"></image>
          <text class="unit3_name">美味外带</text>
          <text>取餐更便捷</text>
        </view>
      </navigator>
    </view>
<!--    推荐-->
    <text>热门推荐</text>
    <view class="unit4">
			<image src="../../static/main/标题底框.png"></image>
			<view class="unit4_text" style="font-size: 18px">
				商品信息1
			</view>
    </view>
    <view class="unit4">
      <image src="../../static/main/标题底框.png"></image>
      <view class="unit4_text" style="font-size: 18px">
        商品信息2
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      table:'',
    }
  },
  methods: {
navmenu(){
  uni.setStorageSync('table',[this.table,'堂食']);
},
 navbesides(){
   uni.setStorageSync('table',[this.table,'外带']);
 }
  },
  onLoad(options) {
     this.table = options.table
  }

}

</script>

<style lang="scss">
page {
  background: url(../../static/main/顶部底图.png) no-repeat;
  background-size: contain;
  background-color: #f3f2f4;

}

#content {
  margin: 150rpx 20rpx 0 20rpx;
}

.unit1 {
  display: flex;
 align-items: center;
  justify-content: center;
 height:320rpx;
  background: url('../../static/main/标题底框.png') no-repeat;
  background-size: 100%;

  image {
    width: 30%;
    margin-left: 20rpx;
  }

  .unit1_text {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 100rpx;
    .name {
      font-size: 20px;
    }
  }
}

.unit2{
  display: flex;
  margin-top: 40rpx;
  margin-bottom: 20rpx;

  .unit2Nav{
    display: flex;
    width:100%;
    .unit2_box{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    justify-content:space-between;

      .unit2_img{
        width:90rpx;
        height:100rpx;
      }
    }
  }
}

.unit3 {
  margin-top: 20rpx;
  display: flex;
.unit3Nav{
  display: flex;
  width:100%;
  justify-content: space-around;
  border:2rpx  #ccc;
  border-radius: 40rpx;
  box-shadow: 2rpx 2rpx 4rpx #ccc;
  background-color: #ffffff;
  margin:20rpx;

  .unit3_box {
    margin:30rpx 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    .unit3_img {
      width: 200rpx;
      height: 200rpx;
    }
    .unit3_name{
font-size: 20px;
    }
  }
}
}
.unit4{
	position: relative;
	width: 100%;
	height: 300rpx;
	margin-bottom: 20rpx;
	image{
		width: 100%;
		height: 100%;
	}
	.unit4_text{
		position:absolute;	
		z-index: 2;
		left: 20rpx;
		bottom: 50rpx;
		}
}

</style>
