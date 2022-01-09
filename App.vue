<script>
export default {
  onLaunch: function (options) {
    //获取桌台号
    console.log('桌台号', options.query.tableid);
    const accountInfo = uni.getAccountInfoSync();
    console.log(accountInfo.miniProgram.appId);
    uni.setStorageSync('appid', accountInfo.miniProgram.appId);
    uni.setStorageSync('syyid', '00268');
    uni.setStorageSync('vipid', '26512220');
    uni.setStorageSync('posid', '80800101');
    uni.setStorageSync('tableid', options.query.tableid);
    uni.setStorageSync('tablenumber', '1')
    uni.setStorageSync('fdbh','808001');
    uni.setStorageSync('companyid','800008');
  },
  onShow: function () {
    console.log('App Show');
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
            console.log(res);
            if (res.data[0].Result == '0') {
              uni.setStorageSync('openid', res.data[0].openid); //小程序openid
              uni.setStorageSync('unionid', res.data[0].unionid); //开放平台unionid,可能为空
            } else {
              console.log(res.data[0].openid);
            }
          },
          fail: res => {
            console.info('获取用户openId失败');
            console.info(error);
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
    text: 'coderyh'
  }
};
</script>

<style lang="scss">
/*每个页面公共css */
@import 'node_modules/uview-ui/index.scss';
</style>
