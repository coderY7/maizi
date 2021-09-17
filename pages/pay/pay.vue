<template>
  <view class="content">
    <view class="unit1">
      <view class="unit1_top">
        <view>大厅区</view>
        <view>堂食</view>
      </view>
      <view class="unit1_bottom">
        <text>用餐人数</text>
        <view>2人</view>
      </view>
    </view>
<!--    商品信息-->
    <view class="unit2">
      <view class="unit2_top">
        <text>餐品详情</text>
        <u-button size="mini" type="warning" @click="addmenu">加菜</u-button>
      </view>
      <view class="unit2_box" v-for="(item,index) in Cart.cart" :key="index">
        <image :src=item.image></image>
        <view class="unit2box_text">
          <view class="unit2box_text1">
            <text>{{item.name}}</text>
            <text>{{item.materials_text}}</text>
          </view>
          <view>{{item.number}}</view>
        </view>
      </view>
      <view class="unit2_coupon">
        <view class="unit2_counpon_left">
          <image src="" style="width:30rpx;height:40rpx"></image>
          <view>满减优惠</view>
        </view>
        <view>¥20</view>
      </view>
      <view class="unit2_price">总价格：¥{{Cart.cartprice}}</view>
    </view>
    <view class="unit3">
      <view class="unit3_left">
        <image src="../../static/main/我的会员.png" style="width:30rpx;height:40rpx"></image>
        <text>会员专享</text>
      </view>
      <view>不使用 ></view>
    </view>
    <view class="unit4">
        <view class="unit4_top">
          <view>订单备注</view>
          <view>口味，偏好等 ></view>
        </view>
        <view class="unit4_bottom">
          <text>发票</text>
          <view>不支持线上发票</view>
      </view>
    </view>
    <view class="btn">
      <u-button type="success" class="btn1" @click="pay(Cart)">确定订单</u-button>
      <u-button type="warning" @click="addmenu">加菜</u-button>
    </view>

  </view>
</template>

<script>

export default {
  data() {
    return {
      Cart:{},
      ShowPay:false,
      table:'',
      cart:[]
    }
  },
  methods: {
    //加菜
addmenu(){
  uni.navigateBack({
    delta: 1
  });
},
     pay(Cart){
			uni.setStorageSync('Cart',this.Cart)
      uni.setStorageSync('cart',this.cart)
			uni.reLaunch({
				url:`../payment/payment?table=${this.table}`
			})
    }
  },
  onLoad(options) {
    this.table=options.table
    //获取购买商品数据
    this.Cart=uni.getStorageSync('Cart');
    this.cart=uni.getStorageSync('cart')
  }
}
</script>
<style lang="scss" scoped>
page{
  background-color: #f3f2f4;
}
.content{
  position: relativee;
  margin:20rpx 50rpx 0 50rpx;
  //display:flex;
  .unit1{
    border:2rpx solid #ccc;
    border-radius: 20rpx;
    box-shadow: 1rpx 5rpx 5rpx #ccc;
    background-color: #ffffff;
    width:100%;
    display:flex;
    flex-direction:column;
    .unit1_top{
      display:flex;
      padding: 10rpx 20rpx 5rpx 20rpx;
      justify-content:space-between;
    }
    .unit1_bottom{
      display:flex;
      padding: 10rpx 20rpx 5rpx 20rpx;
      justify-content:space-between;
    }
  }
  .unit2{
   margin-top:50rpx;
    .unit2_top{
      border:2rpx solid #ccc;
      border-radius: 20rpx;
      box-shadow: 1rpx 5rpx 5rpx #ccc;
      background-color: #ffffff;
      display:flex;
      padding: 10rpx 20rpx 5rpx 20rpx;
      justify-content:space-between;
    }
    .unit2_box{
      //border:2rpx solid #ccc;
      border-radius: 20rpx;
      box-shadow: 1rpx 5rpx 5rpx #ccc;
      background-color: #ffffff;
      display:flex;
      justify-content:space-between;
      align-items: center;
      border-bottom: 1px solid #c8c7cc;
      image{
        width:110rpx;
        height:110rpx;
      }
      .unit2box_text{
        padding:20rpx;
        flex:1;
        display:flex;
        justify-content:space-between;
        .unit2box_text1{
          flex:0.8;
          display:flex;
          flex-direction: column;
        }
      }
    }
    .unit2_coupon{
      display:flex;
      padding: 10rpx 0 5rpx 20rpx;
      justify-content:space-between;
      .unit2_counpon_left{
        display:flex;
        justify-content: center;
      }
    }
    .unit2_price{
      display:flex;
      flex-direction:row-reverse;
      margin-top: 10rpx;
    }
  }
  .unit3{
    height:100rpx;
    margin-top:50rpx;
    border:2rpx solid #ccc;
    border-radius: 20rpx;
    box-shadow: 1rpx 5rpx 5rpx #ccc;
    background-color: #ffffff;
    display:flex;
    padding: 10rpx 20rpx 5rpx 20rpx;
    justify-content:space-between;
    align-items: center;
    .unit3_left{
      display:flex;
      justify-content: center;
    }
  }
  .unit4{
    margin-top:80rpx;
    border:2rpx solid #ccc;
    border-radius: 20rpx;
    box-shadow: 1rpx 5rpx 5rpx #ccc;
    background-color: #ffffff;
    width:100%;
    display:flex;
    flex-direction:column;
    .unit4_top{
      display:flex;
      padding: 30rpx 20rpx 15rpx 20rpx;
      justify-content:space-between;
    }
    .unit4_bottom{
      display:flex;
      padding: 15rpx 20rpx 30rpx 20rpx;
      justify-content:space-between;
    }
  }
  .btn{
    display:flex;
    flex-direction:row-reverse;
    position:absolute;
    bottom:20rpx;
    right:20rpx;
    .btn1{
      margin-left:20rpx;
    }
  }
}

</style>

