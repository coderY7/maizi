<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      const accountInfo = uni.getAccountInfoSync();
      console.log(accountInfo.miniProgram.appId);
      uni.setStorageSync('appid', accountInfo.miniProgram.appId)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    //全局数据
    globalData: {
    }
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import "node_modules/uview-ui/index.scss";
</style>
