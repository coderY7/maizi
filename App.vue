<script>
  export default {
		onLaunch: function(options) {
      //获取桌台号
      console.log('桌台号',options.query.tableid)
      const accountInfo = uni.getAccountInfoSync();
      console.log(accountInfo.miniProgram.appId);
      uni.setStorageSync('appid', accountInfo.miniProgram.appId)
      uni.setStorageSync('syyid','00268')
      uni.setStorageSync('vipid','26512220')
      uni.setStorageSync('posid','80800101')
      uni.setStorageSync('tableid',options.query.tableid)
		},
		onShow: function() {
			console.log('App Show')
      let Token ='XMUGTMwd6RihQZEWBAqvh8OSwLhT95wd';
      uni.setStorageSync('token', Token);
		},
		onHide: function() {
			console.log('App Hide')
		},
    //全局数据
    globalData: {
      text:'coderyh'
    }
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import "node_modules/uview-ui/index.scss";
</style>
