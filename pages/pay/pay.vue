<template>
  <view class="content">
    <view class="unit1">
      <view class="unit1_top">
          <view>大厅区</view>
          <view>{{tableid}}</view>
      </view>
      <view class="unit1_bottom">
        <view>用餐人数</view>
<view>{{attendance}}</view>
        <!-- <u-number-box v-model="attendance" @change="valChange" :min="1"></u-number-box> -->
      </view>
    </view>
<!--    商品信息-->
    <view class="unit2">
      <view class="unit2_top">
        <text>餐品详情</text>
        <!-- <u-button size="mini" type="warning" @click="addmenu">加菜</u-button> -->
      </view>
      <view class="unit2_box">
        <view class="unit2_list" v-for="(item,index) in Cart.cart" :key="index">
          <image :src=item.image></image>
          <view class="unit2box_text">
            <view class="unit2box_text1">
              <text>{{item.name}}</text>
              <text style="color:#c2c2c2">{{item.choosedText}}</text>
              <text>*{{item.number}}</text>
            </view>
            <view>¥ {{item.price}}</view>
          </view>
        </view>
        <view class="unit2_coupon">
          <view class="unit2_counpon_left">
            <image src="" style="width:50rpx;height:30rpx"></image>
            <view>满减优惠</view>
          </view>
          <view>
            <text style="color:red">- ¥ 0</text>
            <text style="color:#c4c4c4;margin-left:15rpx;"> ></text>
          </view>
        </view>
        <view class="unit2_price">共计：¥{{Cart.cartprice}}</view>
      </view>
    </view>
    <view class="unit3">
      <view class="unit3_left">
        <image src="../../static/main/hy.png" style="width:30rpx;height:40rpx"></image>
        <text>会员专享</text>
      </view>
      <view style="color:#c2c2c2">不可使用 ></view>
    </view>
    <!-- <view class="unit4">
        <view class="unit4_top">
          <view>订单备注</view>
          <input placeholder="           请输入备注信息" @input="remark"/>
        </view>
        <view class="unit4_bottom">
          <text>发票</text>
          <view style="color:#c2c2c2">不支持线上发票</view>
      </view>
    </view> -->
    <view class="btn">
      <u-button type="success" class="btn1" @click="pay(Cart)">确定下单</u-button>
      <!-- <u-button type="warning" @click="addmenu">加菜</u-button> -->
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      Cart:{},
      ShowPay:false,
      tableid:[],
      attendance:uni.getStorageSync('tablenumber'),
      xsdbh:''//订单号
    }
  },
  methods: {
    //备注
    remark(event){
      console.log('备注信息',event.detail.value)
      uni.setStorageSync('beizhu',event.detail.value)
    },
    //用餐人数
    valChange(e){
      uni.setStorageSync('tablenumber',e.value)
    },
    //加菜
addmenu(){
  uni.navigateBack({
    delta: 1
  });
},
    async pay(Cart){
       this.token = uni.getStorageSync('token');
       this.xsdbh=uni.getStorageSync('xsdbh');
        uni.setStorageSync('Attendance',this.attendance)
       this.attendance = uni.getStorageSync('Attendance');
       //订单下单
      await this.$u.api.orderdishess({
             access_token:uni.getStorageSync('token'),
             xsdbh:uni.getStorageSync('xsdbh'),//订单号
             fdbh: uni.getStorageSync('fdbh'),//分店号
             vipid:uni.getStorageSync('vipid'),//会员号
             viplevel: "HYJG",//会员等级
             viprate: "1.0",//会员折扣率
			       ordertype:'wx',
             syyid: uni.getStorageSync('syyid'),//收银员工号
             posid: uni.getStorageSync('posid'),//pos机
             counts: uni.getStorageSync('Cart').counts,//商品总数
             goodslist: uni.getStorageSync('goodslist')
           }).then(res=>{
         console.log('订单下单',res)
		 uni.removeStorageSync('goodslist');
		 uni.removeStorageSync('Cart');
         uni.setStorageSync('unfinished',res)
        uni.switchTab({
          url:'../order/order'
        })
       })
    }
  },
  onLoad(options) {
    //获取购买商品数据
    this.Cart=uni.getStorageSync('Cart');
    uni.setStorageSync('total',this.Cart.cartprice)
    this.tableid=uni.getStorageSync('tableid')
  }
}
</script>
<style lang="scss" >
page{
  position: relativee;
  background-color: #f3f2f4;
}
.content{

  margin:20rpx 50rpx 0 50rpx;
  //display:flex;
  .unit1{
    height:160rpx;
    border-radius: 30rpx;
    background-color: #ffffff;
    width:100%;
    display:flex;
    flex-direction:column;
    .unit1_top{
      display:flex;
      padding: 30rpx 20rpx 15rpx 20rpx;
      justify-content:space-between;
      border-width: 0 0 0.8px 0;
      border-style: dashed;
      border-color:#D8D8D8;
      .unit1_top_left{
        display:flex;
        flex-direction:row;
		justify-content:space-between;
        .unit1_top_left2{
          margin-left:30rpx;
        }
      }
    }
    .unit1_bottom{
      display:flex;
      padding: 15rpx 20rpx 30rpx 20rpx;
      justify-content:space-between;
    }
  }
  .unit2{
   margin-top:50rpx;
    background-color:#fff;
    border-radius:20rpx;
    .unit2_top{
      border-radius: 20rpx;
      background-color: #ffffff;
      display:flex;
      padding: 10rpx 20rpx 5rpx 20rpx;
      justify-content:space-between;
      border-width: 0 0 0.8px 0;
      border-style: dashed;
      border-color:#D8D8D8;
    }
    .unit2_box{
      //border:2rpx solid #ccc;
      border-radius: 20rpx;
      background-color: #ffffff;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      border-bottom: 1px solid #c8c7cc;
      .unit2_list{
        display:flex;
        flex-direction:row;
        padding:20rpx;
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
    }
    .unit2_coupon{
      display:flex;
      padding: 10rpx 30rpx 5rpx 20rpx;
      justify-content:space-between;
      border-width: 0 0 0.8px 0;
      border-style: dashed;
      border-color:#D8D8D8;
      .unit2_counpon_left{
        display:flex;
        justify-content: center;
      }
    }
    .unit2_price{
      height:60rpx;
      display:flex;
      flex-direction:row-reverse;
      margin-top: 10rpx;
      margin-right: 30rpx;
    }
  }
  .unit3{
    height:100rpx;
    margin-top:30rpx;
    border-radius: 30rpx;
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
    margin-top:30rpx;
    border-radius: 30rpx;
    background-color: #ffffff;
    width:100%;
    display:flex;
    flex-direction:column;
    margin-bottom: 200rpx;
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
    position:fixed;
    bottom:20rpx;
    right:50rpx;
    .btn1{
      margin-left:30rpx;
    }
  }
}

</style>

