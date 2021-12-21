<template>
	<view class="u-wrap">
		<view class="u-search-box">
      <u-search placeholder="搜索" @custom="custom"></u-search>
		</view>
    <view class="rolls">
      <image src="../../static/menu/activity.png" style="width:100%;height:70rpx;"></image>
    </view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
			 :scroll-into-view="itemId">
				<view v-for="(item,index) in categorylist" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']"
				 @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.category_name}}</text>
				</view>
			</scroll-view>
			<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box" @scroll="rightScroll">
				<view class="page-view">
						<view class="item-container">
							<view class="thumb-box" v-for="(product, index1) in disheslist" :key="index1"
              @tap="showProductDetailModal(product)">
								<image class="item-menu-image" :src="imgurl+product.small_img_path" mode=""></image>
								<view class="item-menu-text">
									<view style="font-size: 16px;">{{product.spmc}}</view>
									<view class="price-btn">
										<view style="font-size: 14px;color: #f4461c;">￥{{product.nsjg}}</view>
<!--   选择-->
                    <actions :materials-btn="!product.is_single"
                             @materials="showProductDetailModal(product)"
                             :number="productCartNum(product.spbm)"
                             @add="handleAddToCart(product)"
                             @minus="handleMinusFromCart(product)" />
									</view>
								</view>
							</view>
						</view>
<!--					</view>-->
				</view>
			</scroll-view>
		</view>
    <!-- 商品详情 modal begin -->
    <product-modal :product="product"
                   :visible="productModalVisible"
                   @cancel="closeProductDetailModal"
                   @add-to-cart="handleAddToCartInModal"
    />
    <!-- 购物车栏 begin -->
    <cart-bar :cart="cart"
              @add="handleAddToCart"
              @minus="handleMinusFromCart"
              @clear="clearCart"
              @pay="pay"
    />

	</view>
</template>
<script>

  import Actions from './components/actions/actions.vue'
  import CartBar from './components/cartbar/cartbar.vue'
  import ProductModal from './components/product-modal/product-modal.vue'
  import cartPopup from './components/cart-popup/cart-popup.vue'
  import Search from './components/search/search.vue'
  import categories from "../../common/categories";


  export default {
    components: {
      Actions,
      CartBar,
      ProductModal,
      cartPopup,
      Search
    },
    data() {
      return {
        imgurl:"http://api.mzsale.cn/",
        scrollTop: 0, //tab标题的滚动条位置
        oldScrollTop: 0,
        current: 0, // 预设当前项的值
        menuHeight: 0, // 左边菜单的高度
        menuItemHeight: 0, // 左边菜单item的高度
        itemId: '', // 栏目右边scroll-view用于滚动的id
        //tabbar: classifyData,//测试数据
        menuItemPos: [],
        arr: [],
        scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
        timer: null, // 定时器
        productModalVisible: false,//商品详情显示
        categories: categories,
        cart: [],
        product: {},
        currentCategoryId: 0,
        notices: [],
        cartPopupShow: false,
        productsScrollTop: 0,
        showSearch: false,
        cartprice:'',
        Cart:{},

        categorylist:[],  //菜品分类
        disheslist:[] ,    //菜品数据
        category_id:[], //菜品分类ID
        companyid:uni.getStorageSync('companyid'),
        counts:'',//商品数量
        goodslist: []
      }
    },
    onShow(){
      console.log(getApp().globalData.text)
      this.token = uni.getStorageSync('token');
      this.$u.api.categorys({
        access_token:this.token,
        vtype:'pos',
        fdbh:uni.getStorageSync('fdbh'),
        companyid:uni.getStorageSync('companyid'),
        parentid:"",
        level:"3"
      }).then((res)=> {
        console.log('左侧菜单:',res)
        this.categorylist=res.categorylist
        //获取菜品数据
        this.$u.api.caterings({
          access_token:this.token,
          vtype:"pos",
          fdbh:uni.getStorageSync('fdbh'),
          companyid:uni.getStorageSync('companyid'),
          categoryid:this.categorylist[0].category_id
        }).then((res) => {
          console.log('右侧菜单：',res)
          this.disheslist=res.disheslist
        })
      },(err)=>{
        console.log('shibai')
      })
      if(uni.getStorageSync('openid')==''){
        console.log('跳转登录')
        uni.switchTab({
          url: '/pages/my/my'
        });
      }
    },
    onLoad(options) {

    },
    onReady() {
      //this.getMenuItemTop()
      console.log('onpeady')
    },
    methods: {
      //搜索
      custom(e){
        console.log(e)
        this.$u.api.dishess({
          access_token:uni.getStorageSync('token'),
          vtype:'pos',
          categoryid:'10',
          spmc:e,
          fdbh:uni.getStorageSync('fdbh'),
          companyid:uni.getStorageSync('companyid')
        }).then((res) =>{
          console.log('搜索')
          console.log(res)
        })
      },
      // 点击左边的栏目切换
      async swichMenu(index) {
        if (index == this.current) return;
        this.$nextTick(function () {
          this.current = index;
        })
        if(index=='0'){
          //获取菜品数据
          this.$u.api.caterings({
            access_token:uni.getStorageSync('token'),
            vtype:"pos",
            fdbh:uni.getStorageSync('fdbh'),
            companyid:uni.getStorageSync('companyid'),
            categoryid:this.categorylist[0].category_id
          }).then((res) => {
            console.log('获取菜品:',res)
            this.disheslist=res.disheslist
          })
        }
        // 点击分类切换请求
        if(index){
          //获取菜品数据
          this.$u.api.caterings({
            access_token:uni.getStorageSync('token'),
            vtype:"pos",
            fdbh:uni.getStorageSync('fdbh'),
            companyid:uni.getStorageSync('companyid'),
            categoryid:this.categorylist[index].category_id
          }).then((res) => {
            console.log('获取菜品:',res)
            this.disheslist=res.disheslist
          })
        }
      },
      //添加到购物车
      handleAddToCart(product) {
        const index = this.cart.findIndex(item => {
            return (item.spbm == product.spbm) && (item.choosedText == product.choosedText)
        })
        if(index > -1) {
          this.cart[index].goodslist.quantity+=1;
          console.log(this.cart[index].goodslist.quantity)
          this.cart[index].number += (product.number || 1)
            return
        }
        this.cart.push({
          id: product.spbm,
          cate_id: product.category_id,
          name: product.spmc,
          number: product.number || 1,
          image: this.imgurl+product.small_img_path,
          is_single: product.is_single,
          choosedText: product.choosedText || '',
          goodslist:product.goodslist,
          price:  product.goodslist.price,
          zxprice:product.goodslist.zxprice
        })
        console.log('购物车中的商品：',this.cart)
      },
      //从购物车减商品
      handleMinusFromCart(product) {
         let index = this.cart.findIndex(item => (item.spbm == product.spbm) && (item.choosedText == product.choosedText))
        this.cart[index].goodslist.quantity-=1;
        this.cart[index].number -= 1
        if(this.cart[index].number <= 0) {
          this.cart.splice(index, 1)
        }
      },
      //菜品详情页
      async showProductDetailModal(product) {
       await this.$u.api.exts({
          access_token:this.token,
          vtype:"pos",
         fdbh:uni.getStorageSync('fdbh'),
         companyid:uni.getStorageSync('companyid'),
          spbm:product.spbm,
        }).then((res) => {
          Object.assign(product,res)
        })
        this.product = product
        this.productModalVisible = true
      },
      handleAddToCartInModal(product) {
        console.log('选择的商品',product)
        this.handleAddToCart(product)
        this.closeProductDetailModal()
      },
      closeProductDetailModal(e) {
        this.productModalVisible = false
        this.product = {}
      },
      clearCart() {
        this.cart = []
      },

      pay(){
        var goodslist = this.cart.reduce((previous,primary)=>{
          previous.push(primary.goodslist);
          return previous;
        },[]);
        uni.setStorageSync('goodslist', goodslist)
        //计算购物车总价
        this.cartprice=this.cart.reduce((acc, cur) => acc + cur.number * cur.price+cur.zxprice-cur.price, 0)
        //计算商品数量
        this.counts=this.cart.reduce((acc, cur) => acc + cur.number, 0)
        //跳转支付
        this.Cart={
          cart:this.cart,
          cartprice:this.cartprice,
          counts:this.counts
        }
        uni.setStorageSync('Cart',this.Cart)



        //生成订单
        this.$u.api.orders({
          access_token:this.token,
          vtype:"new",
          posid:uni.getStorageSync('posid'),
          tableid:uni.getStorageSync('tableid'),
          tablenumber:uni.getStorageSync('tablenumber'),
          tablewaiter:uni.getStorageSync('syyid'),
          fdbh:uni.getStorageSync('fdbh'),
        }).then(
            (res)=>{
          console.log("订单：",res)
              // if(res.error_code=='500'){
              //   uni.showModal({
              //     title: '提示',
              //     content: '当前桌台已有人，是否清台',
              //     success:  (res)=> {
              //       if (res.confirm) {
              //         console.log('用户点击确定');
              //         //清台
              //         this.$u.api.orders({
              //           access_token:uni.getStorageSync('token'),
              //           vtype:'clear',
              //           tableid:uni.getStorageSync('tableid'),
              //           fdbh:uni.getStorageSync('fdbh')
              //         }).then((res)=>{
              //           console.log('清台成功：',res)
              //           this.$u.api.orders({
              //             access_token:this.token,
              //             vtype:"new",
              //             posid:"80800101",
              //             tableid:uni.getStorageSync('tableid'),
              //             tablenumber:uni.getStorageSync('tablenumber'),
              //             tablewaiter:"00268",
              //             fdbh:uni.getStorageSync('fdbh'),
              //           }).then(res=>{
              //             console.log("生成订单")
              //             uni.setStorageSync('xsdbh', res.xsdbh);
              //             uni.navigateTo({
              //               url:`/pages/pay/pay?table=${this.table}`,
              //             })
              //           })
              //         })
              //       } else if (res.cancel) {
              //         console.log('用户点击取消');
              //       }
              //     }
              //   });
              // }
              if(res.error_code=='0'){
                console.log("生成订单")
                uni.setStorageSync('xsdbh', res.xsdbh);
                uni.navigateTo({
                  url:`/pages/pay/pay?table=${this.table}`,
                })
              }
        }
        )
      }
  },
    computed:{
      productCartNum() {	//计算单个饮品添加到购物车的数量
        return id => this.cart.reduce((acc, cur) => {
          if(cur.id === id) {
            return acc += cur.number
          }
          return acc
        }, 0)
      }
    }
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}
	.u-search-box {

	}
	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}
	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #ff9f13;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid #ff9f13;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.class-item:last-child {
		min-height: 100vh;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width:100%;
		display: flex;
		align-items: center;

		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 150rpx;
		height: 150rpx;
    border-radius: 20rpx;
	}
  .item-menu-text {
    flex:1;
    margin-left: 20rpx;
    .price-btn{
      display: flex;
      justify-content: space-between;
    }

  }
</style>
