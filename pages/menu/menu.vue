<template>
	<view class="u-wrap">
		<view class="u-search-box">
      <u-search placeholder="搜索" ></u-search>
		</view>
    <view class="rolls">
      <image src="../../static/menu/满减活动.png" style="width:100%;height:70rpx;"></image>
    </view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
			 :scroll-into-view="itemId">
				<view v-for="(item,index) in categorylist" :key="index" class="u-tab-item" :class="[current == index ? 'u-tab-item-active' : '']"
				 @tap.stop="swichMenu(index)">
					<text class="u-line-1">{{item.category_desc}}</text>
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
	//import classifyData from '@/common/classify.data.js';
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
        companyid:'800008',
        counts:'',//商品数量
        goodslist: []
      }
    },
    onShow(){
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
      })
    },
    onLoad(options) {

    },
    onReady() {
      this.getMenuItemTop()
    },
    methods: {
      // 点击左边的栏目切换
      async swichMenu(index) {
        if (this.arr.length == 0) {
          await this.getMenuItemTop();
        }
        if (index == this.current) return;
        this.scrollRightTop = this.oldScrollTop;
        this.$nextTick(function () {
          this.scrollRightTop = this.arr[index];
          this.current = index;
          this.leftMenuStatus(index);
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
      //获取一个目标元素的高度
      getElRect(elClass, dataVal) {
        new Promise((resolve, reject) => {
          const query = uni.createSelectorQuery().in(this);
          query.select('.' + elClass).fields({
            size: true
          }, res => {
            // 如果节点尚未生成，res值为null，循环调用执行
            if (!res) {
              setTimeout(() => {
                this.getElRect(elClass);
              }, 10);
              return;
            }
            this[dataVal] = res.height;
            resolve();
          }).exec();
        })
      },
      // 观测元素相交状态
      async observer() {
        this.tabbar.map((val, index) => {
          let observer = uni.createIntersectionObserver(this);
          // 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
          // 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
          observer.relativeTo('.right-box', {
            top: 0
          }).observe('#item' + index, res => {
            if (res.intersectionRatio > 0) {
              let id = res.id.substring(4);
              this.leftMenuStatus(id);
            }
          })
        })
      },
      // 设置左边菜单的滚动状态
      async leftMenuStatus(index) {
        this.current = index;
        // 如果为0，意味着尚未初始化
        if (this.menuHeight == 0 || this.menuItemHeight == 0) {
          await this.getElRect('menu-scroll-view', 'menuHeight');
          await this.getElRect('u-tab-item', 'menuItemHeight');
        }
        // 将菜单活动item垂直居中
        this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
      },
      // 获取右边菜单每个item到顶部的距离
      getMenuItemTop() {
        new Promise(resolve => {
          let selectorQuery = uni.createSelectorQuery();
          selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
            // 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
            if (!rects.length) {
              setTimeout(() => {
                this.getMenuItemTop();
              }, 10);
              return;
            }
            rects.forEach((rect) => {
              // 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
              this.arr.push(rect.top - rects[0].top);
              resolve();
            })
          }).exec()
        })
      },
      // 右边菜单滚动
      async rightScroll(e) {
        this.oldScrollTop = e.detail.scrollTop;
        if (this.arr.length == 0) {
          await this.getMenuItemTop();
        }
        if (this.timer) return;
        if (!this.menuHeight) {
          await this.getElRect('menu-scroll-view', 'menuHeight');
        }
        setTimeout(() => { // 节流
          this.timer = null;
          // scrollHeight为右边菜单垂直中点位置
          let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
          for (let i = 0; i < this.arr.length; i++) {
            let height1 = this.arr[i];
            let height2 = this.arr[i + 1];
            // 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
            if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
              this.leftMenuStatus(i);
              return;
            }
          }
        }, 10)
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
        })
        console.log(product)
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
       await this.$u.api.dishess({
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
        this.cartprice= this.cart.reduce((acc, cur) => acc + cur.number * cur.price, 0)
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
          posid:"80800101",
          tableid:uni.getStorageSync('tableid')[0],
          tablenumber:uni.getStorageSync('tablenumber'),
          tablewaiter:"00268",
          fdbh:uni.getStorageSync('fdbh'),
        }).then(
            (res)=>{
          console.log("订单：",res)
              if(res.error_code=='500'){
                console.log('清台')
                this.$u.api.orders({
                  access_token:uni.getStorageSync('token'),
                  vtype:'clear',
                  tableid:uni.getStorageSync('tableid')[0],
                  fdbh:uni.getStorageSync('fdbh')
                }).then((res)=>{
                  console.log('清台成功：',res)
                })
              }
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
	}
  .item-menu-text {
    flex:1;

    .price-btn{
      display: flex;
      justify-content: space-between;
    }

  }
</style>
