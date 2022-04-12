<template>
	<uni-popup ref="popup" type="bottom" @change="change">
		<view class="cart-popup">
			<view class="header">
				<view class="order-type">
					<view class="font-weight-bold">
<!--            <view>请选择就餐人数</view>-->
<!--            <u-number-box v-model="value" @change="valChange" :min="1"></u-number-box>-->
            <view>购物车列表</view>
          </view>
				</view>
				<view  @tap="clear" class="delete-right">
          <view>
            <image src="/static/common/delete.png" class="delete-btn"></image>
          </view>
					<view>清空菜品</view>
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
								</view>
								<view class="price-and-actions">
									<view class="price">￥{{ item.price }}</view>
									<actions :number="item.number" @add="add(item,index)" @minus="minus(item,index)"></actions>
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
      value:1
    }
  },
	props: {
		cart: {
			type: Array,
			default: () => []
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
			    content: '清空菜品',
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
    margin-right: 20rpx;
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
			padding: 30rpx 0;
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
