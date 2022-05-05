	
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	var baseUrl='https://cat.mzsale.com/mzsale/web'
		//测试环境
			if(uni.getStorageSync('offUrl')=='https://cateapi.mzsale.cn/'){
				uni.showToast({
					title: '当前为测试环境',
					duration: 1000
				});
				var baseUrl='https://cateapi.mzsale.cn/mzsale/web'
			}
	console.log(baseUrl)
    // 此为自定义配置参数，具体参数见上方说明
    Vue.prototype.$u.http.setConfig(
        {
            baseUrl: baseUrl, // 请求的本域名
            // 设置为json，返回后会对数据进行一次JSON.parse()
            dataType: 'json',
            showLoading: true, // 是否显示请求中的loading
            loadingText: '请求中...', // 请求loading中的文字提示
            loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
            originalData: true, // 是否在拦截器中返回服务端的原始数据
            loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
            // 配置请求头信息
            header: {
                'content-type': 'application/json;charset=UTF-8'
            },
        }
    );

    // 请求拦截，配置Token等参数
    Vue.prototype.$u.http.interceptor.request = (config) => {
    
        return config;
       
    }

    // 响应拦截，判断状态码是否通过
    Vue.prototype.$u.http.interceptor.response = (res) => {
           const {data} = res;
        if(res.statusCode == 200) {
            
            return data;
        } else if(res.statusCode == 201) {
            // 假设201为token失效，这里跳转登录
            vm.$u.toast('验证失败，请重新登录');
            setTimeout(() => {
                // 此为uView的方法，详见路由相关文档
                vm.$u.route('/pages/my/my')
            }, 1500)
            return false;
        } else {
            // 如果返回false，则会调用Promise的reject回调，
            // 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
            return false;
        }
    }
}

export default {
    install
}