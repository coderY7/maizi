<script>
export default {
  onLaunch: function (options) {
    const appId = uni.getAccountInfoSync().miniProgram.appId;
    uni.setStorageSync('appid', appId);
    uni.setStorageSync('syyid', '00268');
    uni.setStorageSync('vipid', '26512220');
    uni.setStorageSync('posid', '80800101');
    uni.setStorageSync('tableid', options.query.tableid);
    uni.setStorageSync('tablenumber', '0')
    uni.setStorageSync('fdbh','808001');
    uni.setStorageSync('companyid','800008');
    const updateManager = uni.getUpdateManager();
	updateManager.onCheckForUpdate(function (res) {
	  // 请求完新版本信息的回调
	  console.log(res.hasUpdate);
	});
	
	updateManager.onUpdateReady(function (res) {
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
	
	updateManager.onUpdateFailed(function (res) {
	  // 新的版本下载失败
	});
  },
  onShow: function () {
    let Token = 'XMUGTMwd6RihQZEWBAqvh8OSwLhT95wd';
    uni.setStorageSync('token', Token);
    //获取openid
    uni.login({
      provider: 'weixin',
      success: (res) => {
        uni.request({
          url: 'https://wx.ecsun.cn/AjacService/liteappopenid.ashx',
          data: {
            appid: uni.getStorageSync('appid'),
            code: res.code
          },
          method: 'GET',
          dataType: 'json',
          success: res => {
            if (res.data[0].Result == '0') {
              uni.setStorageSync('openid', res.data[0].openid); //小程序openid
              uni.setStorageSync('unionid', res.data[0].unionid); //开放平台unionid,可能为空
            }
          },
          fail: res => {
            console.info('获取用户openId失败');
          }
        });
      }
    });

  },
  onHide: function () {
    console.log('App Hide');
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
</style>
