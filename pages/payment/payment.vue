<template>
	<view class="content">
		<view class="unit1">
			<text>桌台号：{{tableid}}</text>
			<text>就餐人数：{{tablenumber}}</text>
		</view>
		<view class="unit2">
			<view style="font-size: 20px;margin-bottom:14px;">支付金额</view>
			<view style="font-size:30px;color:#f4461c">¥{{pay}}</view>
			<view style="font-size:12px;color:#c1c1c1">支付剩余时间</view>
		</view>

		<!--    <Paytype @change="btnchange" class="unit3"></Paytype>-->

		<view class="unit4">
			<u-button shape="circle" type="error" @click="pays">确定支付</u-button>
		</view>
	</view>
</template>

<script>
import paytype from '../../components/i-pay-type/i-pay-type'

export default {
		name: "payment",
		data() {
			return {
				tableid: '',
				xsdbh: '', //订单号
				readytopays: '',
				pay: Number.parseInt(uni.getStorageSync('unfinished').paytotal),
				payment: '0',
				tablenumber: ''
			}
		},
		components: {
			paytype
		},
		onLoad(options) {
			this.tableid = uni.getStorageSync('tableid'),
				this.xsdbh = uni.getStorageSync('xsdbh'), //订单号
				this.readytopays = uni.getStorageSync('readytopays')
			//this.pay=parseInt(this.readytopays.paytotal).toFixed(2)
		},
		onShow() {
			this.tablenumber = uni.getStorageSync('tablenumber')
		},
		methods: {


			btnchange(index) {
				this.payment = index
			},
			pays() {
				console.log('微信支付')
				var snvar = uni.getStorageSync('companyid'); //商家SN
				var fdbhvar = uni.getStorageSync('fdbh'); //分店编号
				//获取商户信息
				uni.request({
					url: 'https://lite.ecsun.cn/api/init/' + snvar + '-' + fdbhvar,
					method: 'GET',
					dataType: 'json',
					success: (ress) => {
						console.log('获取商家商户号信息', ress)
						uni.setStorageSync('subappid', ress.data.wxpaylist.appid); //商家公众号子appid
						uni.setStorageSync('submchid', ress.data.wxpaylist.submchid); //商家支付子商户号

						wx.request({ //请求支付必要参数，发起预支付请求
							url: 'https://wx.ecsun.cn/AjacService/LiteReadyToPay2.ashx',
							data: {
								subappid: uni.getStorageSync('appid'), //小程序appid
								openid: uni.getStorageSync('openid'), //小程序openid
								submchid: uni.getStorageSync('submchid'), //商家支付子商户号
								billnum: uni.getStorageSync('xsdbh'), //本次交易订单号
								total_fee: uni.getStorageSync('unfinished').paytotal, //本次交易应付总额
								cardid: '',
								nums: Math.random()
							},
							method: 'GET',
							dataType: 'json',
							success: (ress) => {
								console.log('微信调用成功', ress);
								//微信支付
								wx.requestPayment( //调用微信支付
									{
										'timeStamp': ress.data.timeStamp,
										'nonceStr': ress.data.nonceStr,
										'package': ress.data.package,
										'signType': 'MD5',
										'paySign': ress.data.paySign,
										'success': (res) => {
											console.log('微信支付成功:', res);
											uni.showToast({
												title: '微信支付成功',
												duration: 1000,
												image: '../../static/pay/win.png'
											})
											//支付成功，立刻调用查单接口查询订单在后台是否成功
											this.$u.api.paydones({
												access_token: uni.getStorageSync(
													'token'),
												flow_no: uni.getStorageSync(
													'xsdbh'),
												payno: '04',
												total: uni.getStorageSync(
													'readytopays').paytotal,
												payid: '',
												syyid: uni.getStorageSync('syyid'),
												vipid: uni.getStorageSync(
													'openid'),
												fdbh: uni.getStorageSync('fdbh'),
												companyid: uni.getStorageSync(
													'companyid')
											}).then((res) => {
												console.log('查询订单结算完成', res)
												uni.setStorageSync('completion',
													res)
											})

										},
										'fail': (res) => {
											console.log('支付失败:', res, this);
											uni.showToast({
												title: '微信支付失败',
												duration: 1000,
												image: '../../static/pay/fail.png'
											})
										},
										'complete': function(res) {}
									})

							},
							fail: function(error) {
								console.log('准备支付失败', error);
							}
						});
					},
					fail: function(error) {
						console.log('获取门店初始化信息失败', error);
					}
				});



			}
		}
	}
</script>

<style lang="scss">
	page {
		background: url(../../static/main/dt.png) no-repeat;
		background-size: contain;
		background-color: #f3f2f4;

	}

	.content {
		display: flex;
		flex-direction: column;
		margin: 150rpx 30rpx 0 30rpx;
		position: relativee;

		.unit1 {
			border: 2rpx #ccc;
			border-radius: 40rpx;
			box-shadow: 2rpx 2rpx 4rpx #ccc;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx;

			text {
				font-size: large;
			}
		}

		.unit2 {
			margin-top: 20rpx;
			border: 2rpx solid #ccc;
			border-radius: 40rpx;
			box-shadow: 2rpx 2 rpx 4rpx #ccc;
			background-color: #fff;
			height: 300rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.unit3 {
			margin-top: 100rpx;
		}

		.unit4 {
			position: absolute;
			bottom: 40rpx;
			right: 30rpx;
			left: 30rpx;


		}
	}
</style>
