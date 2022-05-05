<template>
	<view class="container">
		<u-navbar :is-back="false"></u-navbar>
		<view class="box">
			<view class="unit1">
				<image class="unit1" src='../../static/juli.png'></image>
			</view>
	<view class="unit2">您当前位置超过点餐距离，无法点餐</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			uni.clearStorageSync();
		
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss">
.box{
	margin-top: 18vh;
	display: flex;
	justify-content: center;
	align-items:center;
	flex-direction: column;
	
	
}
.unit1{
		width: 200px;
		height: 200px;
	}
	.unit2{
		margin-top: 30px;
		font-size: 32rpx;
	}
</style>
