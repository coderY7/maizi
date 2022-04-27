<template>
	<uni-popup ref="popup" type="bottom" @change="change">
		<view class="cart-popup">
			<view class="header">
				<view class="order-type">
					<view class="font-weight-bold">
<!--            <view>请选择就餐人数</view>-->
<!--            <u-number-box v-model="value" @change="valChange" :min="1"></u-number-box>-->
            <view>菜品列表</view>
          </view>
				</view>
				<view  class="delete-right">
					<view class="rightbox" style="margin-right: 36rpx;"  @tap="clear">
						<view>
						  <image src="/static/common/delete.png" class="delete-btn"></image>
						</view>
						<view>清空未下单</view>
					</view>
         <view class="rightbox" @tap="close">
         	<view>
         	  <image src="/static/common/guanbi.png" class="delete-btn"></image>
         	</view>
         	<view>关闭</view>
         </view>
				</view>
			
			</view>
			<scroll-view scroll-y class="content">
				<view class="wrapper">
					<view class="list">
						<view class="item" v-for="(item, index) in cart" :key="index">
							<view class="left">
								<image :src="item.image"></image>
							</view>
							<view class="right">
								<view class="name-and-materials">
									<view class="name">{{ item.name }}</view>
									<view class="materials">{{ item.choosedText }}</view>
									<view class="materials" v-if="item.addzxprice!='0'">加料:¥{{item.addzxprice}}</view>
								</view>
								<view class="price-and-actions">
									<view class="price">单价￥{{ item.price }}</view>
									<actions :number="item.number" @add="add(item,index)" @minus="minus(item,index)"></actions>
								</view>
							</view>
						</view>

					</view>
					<!-- 已下单的菜品 -->
					<view class="" style="color:#DD524D;font-size: 32rpx;" v-if="show">
						已下单的菜品	(取消需到前台处理)
					</view>
					<view class="list">
					
						<view class="item" v-for="(item, index) in cartold" :key="index" style="background-color: #eaeaea;margin-top: 10rpx;border-radius: 10rpx;">
							<view class="left">
								<image :src="item.image"></image>
							</view>
							<view class="right">
								<view class="name-and-materials">
									<view class="name">{{ item.name }}</view>
									<view class="materials">{{ item.choosedText }}</view>
									<view class="materials" v-if="item.addzxprice!='0'">辅料:¥{{item.addzxprice}}</view>
								
								</view>
								<view class="price-and-actions">
									<view class="price">￥{{ item.price }}</view>
									<view class="">总共:{{priceInt(item.number)}}件</view>
								</view>
							</view>
						</view>
					
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import actions from '../actions/actions.vue';
import productModal from "../product-modal/product-modal";

export default {
	components: {
		uniPopup,
		actions,
    productModal
	},
  data() {
    return{
			carts:[],
			show:false,
      value:1,
			cartold:uni.getStorageSync('cartold'), //已下单的菜品
			imgurl:"https://cat.mzsale.com/"
    }
  },
	props: {
		cart: {
			type: Array,
			default: () => []
		}
	},
	onShow() {
		console.log('leibain显示')
	},
	watch:{
		cart(newvalue,oldvalue){
			console.log('cort改变')
			this.cartold=uni.getStorageSync('cartold')
		},
		cartold(newvalue,oldvalue){
			console.log('cortold改变')
			this.show=true
		},
	},
	
	computed:{
		priceInt() {
		  return val => {
		    if (val !== parseInt(val)) return val.split('.')[0];
		    else return val;
		  };
		}
	},
	methods: {
		open() {
			this.$refs['popup'].open()
		},
		close() {
			this.$refs['popup'].close()
		},
		change({show}) {
			this.$emit('change', show)
		},
		add(item,index) {
      console.log('item:',item, index)
			this.$emit('add', {...item,index})
		},
		minus(item,index) {
			this.$emit('minus', {...item,index})
		},
		clear() {
			uni.showModal({
			    content: '清空未下单菜品',
				confirmColor: '#DBA871',
			    success: res => {
			        if (res.confirm) {
						this.$emit('clear')
			        }
			    }
			})
		},
    valChange(e) {
      console.log('就餐人数为: ' + e.value)
      uni.setStorageSync('tablenumber',e.value)
    }
	}
};
</script>

<style lang="scss" scoped>
.cart-popup {
	background-color: $bg-color-white;
	padding-bottom: 100rpx;
}

.header {
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
	font-size: $font-size-sm;
	color: $text-color-assist;

	.order-type {
		display: flex;
		align-items: center;
		font-size: $font-size-sm;
		color: $text-color-base;
		
		.extra {
			margin-right: 10rpx;
			border: 2rpx solid $color-primary;
			font-size: 18rpx;
			padding: 2rpx 10rpx;
			color: $color-primary;
			margin-left: 10rpx;
		}
	}
	.delete-right{
    display: flex;
    justify-content: center;
    align-items: center;
  }
	.rightbox{
		margin-right:20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.delete-btn {
		width: 46rpx;
		height: 46rpx;

	}
}

.content {
	max-height: calc(100vh - 600rpx);
	
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
	}
	
	.list {
		
		display: flex;
		flex-direction: column;
		//margin-bottom: 30rpx;
		
		.item {
			display: flex;
			align-items: stretch;
			padding: 30rpx 20rpx;
			position: relative;
			
			&:after {
				content: ' ';
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
			}
			
			.left {
				//flex-shrink: 0;
				display: flex;
				align-items: center;
				border-radius: 10rpx;
				image {
          height:150rpx;
          width:200rpx;
				}
			}
			
			.right {
        padding-left: 20rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: $font-size-medium;
				color: $text-color-base;
				
				.name-and-materials {
					display: flex;
					flex-direction: column;
					margin-bottom: 20rpx;
					
					.name {
						font-weight: bold;
					}
					
					.materials {
						font-size: $font-size-sm;
						color: $text-color-assist;
					}
				}
				
				.price-and-actions {
					display: flex;
					justify-content: space-between;
				
					.price {
						color: $text-color-grey;
					}
				}
			}
		}
	}
}
</style>
