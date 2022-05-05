<template>
	<view class="container">
		
	</view>
</template>
<script>
	export default {
		onLaunch: function(options) {
			console.log(uni.getStorageSync('offUrl'))
			if(uni.getStorageSync('offUrl')=='https://cateapi.mzsale.cn/'){
				console.log9('测试环境')
			}else{
				//正式地址
				uni.setStorageSync('offUrl','https://cat.mzsale.com/')
			}
			console.log(options)
		},
		onShow: function(options) {
			console.log('从二维码中取的数据', options)
			//let name='4-26-4D0E965-C5441-C3508'
			 let name = options.query.scene
			console.log(name)
			let now = name.split("-")
			let codeparam = []
			now.forEach(item => {
				codeparam.push(parseInt(item, 16).toString(10))
			})
			console.log(codeparam)
			//服务员ID不满5位数前面加0
			if (codeparam[1].length < 5) {
				codeparam[1] = codeparam[1].padStart(5, '0')
			}
			console.log(codeparam)
			uni.setStorageSync('syyid', codeparam[1]);
			uni.setStorageSync('vipid', '');
			uni.setStorageSync('posid', codeparam[2]);
			uni.setStorageSync('tableid', codeparam[0]);
			uni.setStorageSync('tablenumber', '1');
			uni.setStorageSync('fdbh', codeparam[3]);
			uni.setStorageSync('companyid', codeparam[4]);
			uni.setStorageSync('xsdbh', '');
			uni.setStorageSync('token', 'XMUGTMwd6RihQZEWBAqvh8OSwLhT95wd');
			
			
			var snvar = uni.getStorageSync('companyid'); //商家SN
			var fdbhvar = uni.getStorageSync('fdbh'); //分店编号
			console.log(`https://lite.ecsun.cn/api/shops/${snvar}`)
			//获取商户信息
			uni.request({
				url: `https://lite.ecsun.cn/api/shops/${snvar}`,
				method: 'GET',
				dataType: 'json',
				success: res => {
					console.log('获取门店信息', res.data.shoplist)
					res.data.shoplist.forEach(item=>{
						if(item.shopid==uni.getStorageSync('fdbh')){
							console.log('匹配成功',item)
					    uni.setStorageSync('shmc', item.shopname) //商户名称
							uni.setStorageSync('shwd', Number(item.latitude)) //商户纬度
							uni.setStorageSync('shjd', Number(item.longitude)) //商户经度
						}
					})		
				},
				fail: error => {
					console.log('获取门店初始化信息失败', error);
				}
			});
			
			
			 
			
			
			//根据桌台号查桌台名称
			this.$u.api.defends({
				access_token:uni.getStorageSync('token'),
				fdbh:uni.getStorageSync('fdbh'),
				companyid:uni.getStorageSync('companyid'),
				table_id:uni.getStorageSync('tableid'),
				vtype:'wxsel'
			}).then((res)=>{
				console.log('桌台信息',res.data[0].table_name)
				uni.setStorageSync('tablename',res.data[0].table_name)
			},err=>{
				console.log(err)
			})
		
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate);
			});
			
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			});
			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
			});
			
			//查询当前桌台订单信息
			this.$u.api.orders({
				access_token: uni.getStorageSync('token'),
				vtype: 'new',
				tableid: uni.getStorageSync('tableid'),
				fdbh: uni.getStorageSync('fdbh'),
				tablewaiter: uni.getStorageSync('syyid'),
				posid: uni.getStorageSync('posid'),
				tablenumber: uni.getStorageSync('tablenumber'),
			}).then((res) => {
				console.log('查询开台信息', res)
				if (res.error_code == '0') {
					uni.setStorageSync('xsdbh', res.xsdbh)
					uni.setStorageSync('popupshow', true)
					uni.switchTab({
						url: '/pages/menu/menu'
					});
				}
				//查询桌台订单信息
				if (res.error_code == '2') {
					console.log('已有订单')
					uni.setStorageSync('xsdbh', res.xsdbh)
					uni.setStorageSync('tablenumber', res.table_number)
					uni.setStorageSync('tablenumberold', res.table_number)
					uni.setStorageSync('popupshow', false)
					
					//已开台单号
					this.$u.api.orders({
						access_token: uni.getStorageSync('token'),
						vtype: 'detail',
						tableid: uni.getStorageSync('tableid'),
						fdbh: uni.getStorageSync('fdbh'),
						xsdbh: uni.getStorageSync('xsdbh')
					}).then(res => {
						let old = res;
						uni.setStorageSync('old', old)
						console.log('查询桌台订单明细：', res)
						let cartold = [];
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
			
							cartold.push({
								id: item.spbm,
								cate_id: item.category_id,
								name: item.spmc,
								number: Number.parseInt(item.quantity) || 1,
								is_single: item.is_single,
								choosedText: text || '',
								price: Number.parseInt(item.price),
								zxprice: Number.parseInt(addzxprice) + Number.parseInt(
									item.price),
								image: `https://cat.mzsale.com/${item.small_img_path}`,
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
						console.log('旧数据信息', cartold)
						uni.setStorageSync('cartold', cartold)
					})
					// uni.switchTab({
					// 	url: '/pages/order/order'
					// });
				}
			})
			
			
			
			
			
			
			
			
			
		},
		onHide: function() {
			uni.removeStorageSync('syyid');
			uni.removeStorageSync('posid');
			uni.removeStorageSync('tableid');
			uni.removeStorageSync('tablenumber');
			uni.removeStorageSync('fdbh');
			uni.removeStorageSync('companyid');
			uni.removeStorageSync('xsdbh');
			uni.removeStorageSync('shmc');
			uni.removeStorageSync('shappid');
			uni.removeStorageSync('popupshow');
			uni.removeStorageSync('cartPrice');
			uni.removeStorageSync('flownumold');
			uni.removeStorageSync('cartold');
			uni.removeStorageSync('cartold');
			uni.removeStorageSync('cartPrice');
			
		},
		//全局数据
		globalData: {
			text: '全局数据'
		}
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'node_modules/uview-ui/index.scss';
@import '@/components/uni-scss/index.scss';
</style>
