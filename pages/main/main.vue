<template>
	<view id="content">
		<!-- 店铺 -->
		<view class="unit1">
			<image mode="" src="../../static/main/LOGO.png" style="width: 130rpx;height: 130rpx;margin-left: 40rpx">
			</image>
			<view class="unit1_text">
				<view class="name">麦子旗舰店</view>
				<text style="margin-top: 20rpx;opacity: 0.6">天府新谷主店</text>
			</view>
		</view>
		<!--    会员-->
		<view class="unit2">
			<navigator class="unit2Nav" url="" @click="vip">
				<view class="unit2_box">
					<image class="unit2_img1" src="../../static/main/hy.png"></image>
					<text>我的会员</text>
				</view>
			</navigator>
			<navigator class="unit2Nav" url="" @click="roll">
				<view class="unit2_box">
					<image class="unit2_img2" src="../../static/main/kj.png"></image>
					<text>红包卡卷</text>
				</view>
			</navigator>
			<navigator class="unit2Nav" url="/pages/order/order" open-type="switchTab">
				<view class="unit2_box">
					<image class="unit2_img3" src="../../static/main/dindan.png"></image>
					<text>我的订单</text>
				</view>
			</navigator>
		</view>
		<!--    点餐-->
		<view id="name">开始点餐</view>
		<view class="unit3">
			<navigator class="unit3Nav" url="/pages/menu/menu" open-type="switchTab" @click="navmenu">
				<view class="unit3_box">
					<image src="../../static/main/scan.png" class="unit3_img"></image>
					<view class="unit3_name">堂食点餐</view>
					<view class="unit3_min">在线点单不排队</view>
				</view>
			</navigator>
			<navigator class="unit3Nav" url="" open-type="switchTab" @click="navbesides">
				<view class="unit3_box">
					<image src="../../static/main/img.png" class="unit3_img"></image>
					<view class="unit3_name">美味外带</view>
					<view class="unit3_min">取餐更便捷</view>
				</view>
			</navigator>
		</view>
		<!--    推荐-->
		<view id="name">热门推荐</view>
		<view class="unit4" @click="hot()">
			<image src="../../static/main/hot.jpg"></image>
			<view class="unit4_text">
				热门菜系
			</view>
		</view>
		<!-- <view class="unit4">
			<image src="../../static/main/hot.jpg"></image>
			<view class="unit4_text">
				商品信息2
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tableid: '',
			}
		},
		methods: {
			//查询订单信息
			order() {
				//查询桌台订单信息
				this.$u.api.orders({
				  access_token:uni.getStorageSync('token'),
				  vtype:'detail',
				  tableid:uni.getStorageSync('tableid'),
				  fdbh:uni.getStorageSync('fdbh'),
				  xsdbh:uni.getStorageSync('xsdbh')
				}).then(res => {
				  console.log('查询桌台订单明细：',res)
				})
				
			},
			hot(){
				uni.switchTab({
					url: '/pages/menu/menu'
				});
			},
			navmenu() {
				uni.setStorageSync('mode', '堂食');
			},
			navbesides() {
				uni.showToast({
					title: '该功能暂不支持，敬请期待',
					duration: 2000,
					icon: 'none'
				});
				uni.setStorageSync('mode', '外带');
			},
			vip() {
				uni.showToast({
					title: '该功能暂不支持，敬请期待',
					duration: 2000,
					icon: 'none'
				});
			},
			roll() {
				uni.showToast({
					title: '该功能暂不支持，敬请期待',
					duration: 2000,
					icon: 'none'
				});
			}
		},
		onLoad(options) {
			//this.tableid = options.tableid
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
	page {
		background: url(../../static/main/dt.png) no-repeat;
		background-size: contain;
		background-color: #f3f2f4;

	}

	#content {
		margin: 180rpx 40rpx 0 40rpx;

	}

	#name {
		margin-left: 10rpx;
		font-size: 20px;
		border-left: 10rpx solid #feb121;
		padding-left: 20rpx;
		margin: 30rpx 0 30rpx 20rpx;
	}

	.unit1 {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 320rpx;
		background: url('../../static/main/dk.png') no-repeat;
		margin: 0 auto;
		background-size: 100%;
		width: calc(100% - 14rpx);

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
				margin: 20 rpx 0;
				font-size: 25px;
			}
		}
	}

	.unit2 {
		display: flex;
		margin-top: 40rpx;
		margin-bottom: 30rpx;

		.unit2Nav {
			display: flex;
			width: 100%;

			.unit2_box {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;

				.unit2_img1 {
					width: 66rpx;
					height: 88rpx;
					margin-bottom: 20rpx;
				}

				.unit2_img2 {
					width: 96rpx;
					height: 76rpx;
					margin-bottom: 20rpx;
				}

				.unit2_img3 {
					width: 79rpx;
					height: 79rpx;
					margin-bottom: 20rpx;
				}
			}
		}
	}

	.unit3 {
		display: flex;

		.unit3Nav {
			display: flex;
			width: 100%;
			justify-content: space-around;
			border: 2rpx #ccc;
			border-radius: 40rpx;
			box-shadow: 4rpx 4rpx 4rpx #ccc;
			background-color: #ffffff;
			margin: 0 20rpx;

			.unit3_box {
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				flex-direction: column;

				.unit3_img {
					width: 180rpx;
					height: 180rpx;
				}

				.unit3_name {
					font-size: 20px;
				}

				.unit3_min {
					padding-top: 10rpx;
					opacity: 0.6;
				}
			}
		}
	}

	.unit4 {
		position: relative;
		width: calc(100% - 40rpx);
		height: 260rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		border-radius: 40rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 50rpx;
			box-shadow: 10rpx 10rpx 10rpx #ccc;

			overflow: hidden;
		}

		.unit4_text {
			color: #fff;
			font-size: large;
			width: 100%;
			height: 100rpx;
			font-size: 18px;
			position: absolute;
			bottom: 0;
			background: #000;
			opacity: 0.6;
			border-radius: 0 0 40rpx 40rpx;
			padding: 20rpx 0 20rpx 20rpx;
		}

	}
</style>
