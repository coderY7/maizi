<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
        this.$u.api.loginInfo({
          email: '23680099@qq.com',
          password: 'yh0717..'
        }).then(res => {
          uni.showToast({
            title: '登录成功',
            duration: 500
          });
          console.log('登录成功', res)
          uni.setStorageSync('token',res.access_token)
        })
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
