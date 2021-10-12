<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
uni.setStorageSync('appid','wxf2eea1f050d040ba')

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
