<template>
	<view class="container">
		<!-- <nav-bar title="导航栏组件"></nav-bar> -->
		<u-navbar :back-text="shname" back-icon-name="" :back-text-style="backstyle"></u-navbar>
		<view class="u-wrap">
		
				<!-- <view class="u-search-box">
		
		      <view class="search-box">
		        <view class="search-input" @tap="showSearch=true">
		          <image src="/static/common/search-icon.png" class="search-icon"></image>
		          <view>搜索</view>
		        </view>
		      </view>
		
		      		<search :show="showSearch" :categories="categories" @hide="showSearch=false" @choose="showProductDetailModal"></search>
				</view> -->
				<view class="shxx">
				<!-- 	<view class="shname">{{shname}}</view> -->
					<view class="shname">桌台名:{{tablename}}</view>
				</view>
		
		    <view class="rolls">
				<u-notice-bar mode="horizontal" :list="barlist"></u-notice-bar>
		      <!-- <image src="../../static/menu/activity.png" style="width:100%;height:70rpx;"></image> -->
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
		                             @add="handleAddToCart(product,index)"
		                             @minus="handleMinusFromCart(product,index)" />
											</view>
										</view>
									</view>
								</view>
		<!--					</view>-->
						</view>
					</scroll-view>
				</view>
		    <!-- 商品详情 modal begin -->
		    <u-mask :show="show" @click="shows">
		        <product-modal :product="product"
		                       @cancel="closeProductDetailModal"
		                       @add-to-cart="handleAddToCartInModal"
		        />
		    </u-mask>
		
		    <!-- 购物车栏 begin -->
		    <cart-bar :cart="cart"
		              @add="handleAddToCart"
		              @minus="handleMinusFromCart"
		              @clear="clearCart"
		              @pay="pay"
		    />
		    <u-popup v-model="popupshow" mode="center" border-radius="14"  :mask="true"  :mask-close-able="false" >
		      <view style="display:flex;flex-direction:column;justify-content:center;align-items:center;width:500rpx;height:300rpx;">
		        <text style="margin-bottom:20rpx">请选择就餐人数</text>
		        <u-number-box v-model="value" min="1" max="10" @change="valChange"></u-number-box>
		        <u-button @click="ensure" style="margin-top:30rpx;">确定</u-button>
		      </view>
		    </u-popup>
		<!--		<search :show="showSearch" :categories="categories" @hide="showSearch=false" @choose="showProductDetailModal"></search>-->
		
			</view>
	</view>
</template>
<script>

import Actions from './components/actions/actions.vue'
import CartBar from './components/cartbar/cartbar.vue'
import ProductModal from './components/product-modal/product-modal.vue'
import cartPopup from './components/cart-popup/cart-popup.vue'
import Search from './components/search/search.vue'
import navBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
// import categories from "../../common/categories";


  export default {
    components: {
      Actions,
      CartBar,
      ProductModal,
      cartPopup,
      Search,
			navBar
    },
    data() {
      return {
				backstyle:{color: '#ff9f13','font-size':'18px','margin-left':'10rpx'},
				tablename:'',
				tableid:uni.getStorageSync('tableid'),
				shname:uni.getStorageSync('shmc'),
		  barlist:['欢迎使用扫码点餐小程序','祝您用餐愉快'],//滚动
        popupshow:'',
        show: false,
        imgurl:uni.getStorageSync('offUrl'),
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
        categories: '',
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
        goodslist: [],
        value:'1'//就餐人数
      }
    },
    onShow(){
			this.tablename=uni.getStorageSync('tablename'),
			this.shname=uni.getStorageSync('shmc'),
			this.tableid=uni.getStorageSync('tableid'),
			this.popupshow=uni.getStorageSync('popupshow'),
      this.token = uni.getStorageSync('token');
      this.$u.api.categorys({
        access_token:uni.getStorageSync('token'),
        vtype:'pos',
        fdbh:uni.getStorageSync('fdbh'),
        companyid:uni.getStorageSync('companyid'),
        parentid:"",
        level:"3"
      }).then((res)=> {
        this.categorylist=res.categorylist
        //获取菜品数据
        this.$u.api.caterings({
          access_token:uni.getStorageSync('token'),
          vtype:"pos",
          fdbh:uni.getStorageSync('fdbh'),
          companyid:uni.getStorageSync('companyid'),
          categoryid:this.categorylist[0].category_id
        }).then((res) => {
          this.disheslist=res.disheslist
        })
      },(err)=>{
        console.log('获取菜单失败',err)
      })


    },
    onLoad(options) {
   
    },
    onReady() {
      //this.getMenuItemTop()
			this.popupshow=uni.getStorageSync('popupshow')
    },
		onHide() {
					this.clearCart()
		},
    methods: {
      //人数确定后，开台
      ensure() {
        //修改人数
       
          this.$u.api.orders({
            access_token:uni.getStorageSync('token'),
            vtype:"change",
            tableid:uni.getStorageSync('tableid'),
            tableid_old:uni.getStorageSync('tableid'),
            tablenumber:uni.getStorageSync('tablenumber'),
            tablewaiter:uni.getStorageSync('syyid'),
            fdbh:uni.getStorageSync('fdbh'),
            xsdbh: uni.getStorageSync('xsdbh')
          }).then((res)=>{
            console.log('修改开台人数',res)
			this.popupshow=false
			uni.setStorageSync('popupshow',false)
          })
        
      },
      valChange(e) {
        uni.setStorageSync('tablenumber',e.value)
      },

      shows(){
        this.show=false
        console.log('关闭')
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
            categoryid:this.categorylist[index].category_id
          }).then((res) => {
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
            this.disheslist=res.disheslist
          })
        }
      },
      //添加到购物车
      handleAddToCart(product) {
        // const index = this.cart.findIndex(item => {
        //     return (item.spbm == product.spbm) && (item.choosedText == product.choosedText)
        // })
        if(product.index > -1) {
          this.cart[product.index].goodslist.quantity+=1;
					this.cart[product.index].goodslist.zxprice=this.cart[product.index].price*this.cart[product.index].goodslist.quantity;
          this.cart[product.index].number += (product.number || 1)
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
          zxprice:product.goodslist.zxprice,
          addzxprice:product.addzxprice
        })

        console.log('已经加入购物车中的商品：',this.cart)
      },
      //从购物车减商品
      handleMinusFromCart(product) {
         // let index = this.cart.findIndex(item => (item.spbm == product.spbm) && (item.choosedText == product.choosedText) && (item.name == product.name))
        console.log(product.index)
        this.cart[product.index].goodslist.quantity-=1;
        this.cart[product.index].number -= 1
				
        this.cart[product.index].goodslist.zxprice=this.cart[product.index].price*this.cart[product.index].goodslist.quantity;
				if(this.cart[product.index].number <= 0) {
          this.cart.splice(product.index, 1)
        }
      },
      //菜品详情页
      async showProductDetailModal(product) {
       await this.$u.api.exts({
          access_token:uni.getStorageSync('token'),
          vtype:"pos",
         fdbh:uni.getStorageSync('fdbh'),
         companyid:uni.getStorageSync('companyid'),
          spbm:product.spbm,
        }).then((res) => {
          Object.assign(product,res)
        })
        this.product = product
        this.show=true
      },
	  //点击加入购物车
      handleAddToCartInModal(product) {
        this.handleAddToCart(product)
        this.closeProductDetailModal()
      },
      closeProductDetailModal(e) {
        this.show=false
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
        //this.cartprice=goodslist.reduce((acc, cur) => acc + cur.quantity * cur.price, 0),
            this.cartprice=uni.getStorageSync('cartPrice'),
            //计算商品数量
        this.counts=goodslist.reduce((acc, cur) => acc + cur.quantity, 0)
        //跳转支付
        this.Cart={
          cart:this.cart,
          cartprice:this.cartprice,
          counts:this.counts
        }
        uni.setStorageSync('Cart',this.Cart)
        uni.navigateTo({
          url:'/pages/pay/pay',
        })
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
		height: calc(100vh - 170rpx);
		display: flex;
		flex-direction: column;
    margin:0rpx 40rpx 0 40rpx;
	}
	.u-search-box {

	}
  .search-box {
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;

    .search-input {
      height: 60rpx;
      width: 100%;
      background-color: #f7f7f7;
      font-size: $font-size-base;
      border-radius: 50rem !important;
      display: flex;
      align-items: center;

      .search-icon {
        width: 30rpx;
        height: 30rpx;
        margin:0 20rpx;
      }
    }
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
		background: #fff;
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
		padding: 16rpx 0 0 16rpx;

  }

	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
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
      align-items: center;
    }

  }
	.shname{
		color:#ff9f13;
		font-size: 32rpx;
	}
	.shxx{
		display: flex;
		justify-content:space-between;
	}
</style>
