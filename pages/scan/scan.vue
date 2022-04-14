<template>
  <view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
    onLoad() {
    },
    onShow(){

    },
		methods: {
			scan(){
        console.log('调用扫码')
				// 允许从相机和相册扫码
				uni.scanCode({
					success: (res) =>{
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
           let tableid=4;
            if(tableid!=undefined){
              uni.setStorageSync('syyid', '00268');
              uni.setStorageSync('vipid', '26512220');
              uni.setStorageSync('posid', '80800101');
              uni.setStorageSync('tableid', '4');
              uni.setStorageSync('tablenumber', '1');
              uni.setStorageSync('fdbh', '808001');
              uni.setStorageSync('companyid', '800008');
              uni.setStorageSync('xsdbh', '');
              uni.setStorageSync('token', 'XMUGTMwd6RihQZEWBAqvh8OSwLhT95wd');

            }else {
              console.log('请扫描桌台二维码')
            }

					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
