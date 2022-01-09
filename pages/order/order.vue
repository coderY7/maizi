<template>
  <view>
    <view class="wrap">
      <view class="u-tabs-box">
        <u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
      </view>
      <swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
            <view class="page-box">
<!--  订单状态-->
              <view class="order">
                <view class="store"><u-icon name="clock" :size="30" color="rgb(94,94,94)"></u-icon>：{{orders.xssj}}</view>

                <view v-for="(item,index) in orders.goodslist" :key="index">
                  <view class="top">
                    <view class="left"></view>
                    <view class="right"></view>
                  </view>
                  <view class="item">
                    <view>
                      <image :src="imgurl+item.small_img_path" mode="aspectFill"></image>
                    </view>
                    <view class="right">
                      <view>共{{priceInt(item.quantity)}}件</view>
                    </view>
                  </view>
                </view>
                <view class="total">
                  <view>总价格:{{parseInt(orders.paytotal).toFixed(2)}}</view>
                  <view></view>
                </view>
              </view>
            </view>
          </scroll-view>
        </swiper-item>
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
            <view class="page-box">
              <view class="order" v-for="(res, index) in  orderList[1]" :key="res.id">
                <view class="top">
                  <view class="left">
                    <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
                    <view class="store">{{ res.store }}</view>
                    <u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
                  </view>
                  <view class="right">{{ res.deal }}</view>
                </view>
                <view class="item" v-for="(item, index) in res.goodsList" :key="index">
                  <view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
                  <view class="content">
                    <view class="title u-line-2">{{ item.title }}</view>
                    <view class="type">{{ item.type }}</view>
                    <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
                  </view>
                  <view class="right">
                    <view class="price">
                      ￥{{ priceInt(item.price) }}
                      <text class="decimal">.{{ priceDecimal(item.price) }}</text>
                    </view>
                    <view class="number">x{{ item.number }}</view>
                  </view>
                </view>
                <view class="total">
                  共{{ totalNum(res.goodsList) }}件商品 合计:
                  <text class="total-price">
                    ￥{{ priceInt(totalPrice(res.goodsList)) }}.
                    <text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
                  </text>
                </view>

              </view>
              <u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderList: [[], []],
      dataList: [],
      list: [
        {
          name: '未完成'
        },
        {
          name: '已完成'
        }
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
      loadStatus: ['loadmore','loadmore'],
      time:'',
      Cart:[],
      token:'',
      orders:[],
      imgurl:"http://api.mzsale.cn/",
    };
  },
  onLoad() {
  },
  onShow(){
    this.orders=uni.getStorageSync('orders');
    //查询桌台订单信息
    this.$u.api.orders({
      access_token:uni.getStorageSync('token'),
      vtype:'get',
      tableid:'2',
      fdbh:uni.getStorageSync('fdbh'),
    }).then(res => {
      console.log('查询订单：',res)
    })
    //支付成功订单接口
    this.$u.api.searchs({
      access_token:uni.getStorageSync('token'),
      orderid:uni.getStorageSync('xsdbh'), //销单号
      shopid:uni.getStorageSync('fdbh'),
      posid:uni.getStorageSync('posid'),
      syyid:uni.getStorageSync('syyid'),
      zktype:'ZK',
      zkvalue:'',
    }).then(res => {
      console.log('支付成功订单：',res)
    })


},
  computed: {
    // 价格小数
    priceDecimal() {
      return val => {
        if (val !== parseInt(val)) return val.slice(-2);
        else return '00';
      };
    },
    // 价格整数
    priceInt() {
      return val => {
        if (val !== parseInt(val)) return val.split('.')[0];
        else return val;
      };
    }
  },
  methods: {
    reachBottom() {
      // 此tab为空数据
      if(this.current != 2) {
        this.loadStatus.splice(this.current,1,"loading")
        setTimeout(() => {
          this.getOrderList(this.current);
        }, 1200);
      }
    },
    // 页面数据
    getOrderList(idx) {
      //let index = this.$u.random(0, this.dataList.length - 1);
      let data = JSON.parse(JSON.stringify(this.dataList[index]));
      let data1 = JSON.parse(JSON.stringify(this.dataList[1]));
      if(idx=='0'){
        this.orderList[0].push(data);
      }
      if(idx=='1'){
        this.orderList[1].push(data1);
      }
      this.loadStatus.splice(this.current,1,"loadmore")
    },
    // 总价
    totalPrice(item) {
      let price = 0;
      item.map(val => {
        price += parseFloat(val.price);
      });
      return price.toFixed(2);
    },
    // 总件数
    totalNum(item) {
      let num = 0;
      item.map(val => {
        num += val.number;
      });
      return num;
    },
    // tab栏切换
    change(index) {
      this.swiperCurrent = index;
      this.getOrderList(index);
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    }
  }
};
</script>

<style>
/* #ifndef H5 */
page {
  height: 100%;
  background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
  width: 700rpx;
  background-color: #ffffff;
  margin: 20rpx auto;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  font-size: 28rpx;
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .store {
        margin: 0 10rpx;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
    .right {
      color: $u-type-warning-dark;
    }
  }
  .item {
    display: flex;
    justify-content: space-between;
    margin: 10rpx 0;
    image{
      width:100rpx;
      height:100rpx;
    }
    .right{
    }

  }
  .total {
   display: flex;

    justify-content: space-between;
    align-items: center;
  }
}
.centre {
  text-align: center;
  margin: 200rpx auto;
  font-size: 32rpx;
  image {
    width: 164rpx;
    height: 164rpx;
    border-radius: 50%;
    margin-bottom: 20rpx;
  }
}
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
}
.swiper-box {
  flex: 1;
}
.swiper-item {
  height: 100%;
}
</style>
