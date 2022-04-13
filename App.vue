<script>
export default {
  onLaunch: function (options) {
    console.log('从二维码中取的数据', options)
    const appId = uni.getAccountInfoSync().miniProgram.appId;
    uni.setStorageSync('appid', appId);
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
    //清台
    // this.$u.api.orders({
    // 	access_token:uni.getStorageSync('token'),
    // 	vtype:'clear',
    // 	tableid:uni.getStorageSync('tableid'),
    // 	fdbh:uni.getStorageSync('fdbh')
    // }).then((res)=>{
    // 	console.log('清台',res)
    // })
  },
  onShow: function () {
    //获取openid
    uni.login({
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
            uni.setStorageSync('openid', res.data[0].openid); //小程序openid
            uni.setStorageSync('unionid', res.data[0]
                .unionid); //开放平台unionid,可能为空
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
