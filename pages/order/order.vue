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
              <view class="order" v-if="goodslist">
<!--                <view class="store"><u-icon name="clock" :size="30" color="rgb(94,94,94)"></u-icon>：{{orders.xssj}}</view>-->
                <view v-for="(item,index) in cartlistold" :key="index">
                  <view class="top">
                    <view class="left"></view>
                    <view class="right"></view>
                  </view>
                  <view class="item">
                    <view class="item_left">
                      <image :src="item.image" mode="aspectFill"></image>
					  <view class="item_left_box">
						  <view>{{item.name}}</view>
						  <view style="font-size: 20rpx; color: #999999;" class="listtext">{{item.choosedText}}</view>
					  </view>
                    </view>
                    <view class="right">
                      <view>总共:{{priceInt(item.number)}}件</view>
											<view>单价:{{priceInt(item.price)}}</view>
                    </view>
                  </view>
                </view>
                <view class="total">
                  <view style="color: #ff9f13;">总价格:¥{{parseFloat(orders.paytotal)}}</view>
                  <view>
                    <u-button @click="dish()" size="mini" type="warning">加菜</u-button>
                    <!-- <u-button @click="pay()">立即支付</u-button> -->
                  </view>
                </view>
              </view>
            </view>
            <!-- <u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore> -->
			<u-divider bg-color="#f2f2f2">{{text[0]}}</u-divider>
          </scroll-view>
        </swiper-item>
		
        <swiper-item class="swiper-item">
          <scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
            <view class="page-box">
              <!-- <u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>-->
			  <u-divider bg-color="#f2f2f2">{{text[1]}}</u-divider>
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
			
		text:['已下单订单，若要取消请前往前台办理','已结算订单'],
      orderList: [[], []],
      dataList: [],
      list: [
        {
          name: '已下单'
        },
        {
          name: '已结算'
        }
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
      loadStatus: ['loadmore','loadmore'],
      time:'',
      orders:'',
      goodslist:false,
      imgurl:"http://cateapi.mzsale.cn/",
			cartlistold:[]
    };
  },
  onLoad() {
  },
  onShow(){
	this.completion=uni.getStorageSync('completion')//支付成功的订单
    //查询桌台订单信息
    this.$u.api.orders({
      access_token:uni.getStorageSync('token'),
      vtype:'detail',
      //tableid:uni.getStorageSync('tableid'),
      fdbh:uni.getStorageSync('fdbh'),
      xsdbh:uni.getStorageSync('xsdbh')
    }).then(res => {
      console.log('查询桌台订单明细：',res)
      this.goodslist=res.goodslist
      this.orders=res
			let cartlistold=[]
			let countold = res.count;
			uni.setStorageSync('flownumold', countold)
			res.goodslist.forEach((item) => {
				let choosedText = [];
				let ext_zxprices = [];
				item.extlist.forEach(res => {
					choosedText.push(res.ext_name)
					ext_zxprices.push(Number.parseInt(res.ext_zxprice))
				})
				let text = choosedText.join(',')
						
				function sum(arr) {
					return arr.reduce((prev, curr) => {
						return prev + curr;
					}, 0);
				}
				let addzxprice = sum(ext_zxprices) //属性总价
						
				cartlistold.push({
					id: item.spbm,
					cate_id: item.category_id,
					name: item.spmc,
					number: Number.parseInt(item.quantity) || 1,
					is_single: item.is_single,
					choosedText: text || '',
					price: Number.parseInt(item.price),
					zxprice: Number.parseInt(addzxprice) + Number.parseInt(
						item.price),
					image: `http://cateapi.mzsale.cn/${item.small_img_path}`,
					addzxprice: addzxprice,
					goodslist: {
						discount: item.discount,
						extlist: item.extlist,
						flownum: item.flownum,
						price: Number.parseInt(item.price),
						zxprice: Number.parseInt(addzxprice) + Number
							.parseInt(item.price),
						quantity: Number.parseInt(item.quantity),
						spbm: item.spbm,
						spsmm: item.spsmm,
					}
				})
			})
			this.cartlistold=cartlistold
			uni.setStorageSync('cartold',cartlistold) //已点菜品列表
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
    //跳转支付
    pay(){
      uni.navigateTo({
        url:'/pages/payment/payment'
      })
    },
    //加菜
    dish(){
      uni.switchTab({
        url:'/pages/menu/menu'
      })
			//默认清除已点
			uni.setStorageSync('yidian',true)
    },
    reachBottom() {
      // 此tab为空数据
      if(this.current != 2) {
        this.loadStatus.splice(this.current,1,"loading")
        // setTimeout(() => {
        //   this.getOrderList(this.current);
        // }, 1200);
      }
    },
    // 页面数据
    getOrderList(idx) {
      //let index = this.$u.random(0, this.dataList.length - 1);
      let data = JSON.parse(JSON.stringify(this.dataList[index]));
      let data1 = JSON.parse(JSON.stringify(this.dataList[1]));
      if(idx=='0'){
        this.orderList[0].push(data);//未成功数据
      }
      if(idx=='1'){
        this.orderList[1].push(data1);// 成功数据
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
      //this.getOrderList(index);
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
      //color: $u-type-warning-dark;
			
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
    .item_left{
		width: 400rpx;
		height: 100%;
		display: flex;
		.item_left_box{
			margin-left: 20rpx;
			display: flex;
			flex-direction:column;
			.listtext{
				display: inline;
			}
		}
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
