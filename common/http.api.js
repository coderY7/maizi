// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let login='/login'
let category= '/catering/category'
let catering = '/catering/dishes'
let dishes='/catering/dishes'
let ext='/catering/dishes/ext'
let order='/catering/order'
let readytopay='/catering/readytopay'
let pay='/catering/pay'
let query='/catering/pay/query'
let back='/catering/pay/back'
let usercheck='/login/usercheck'
let paydone='/catering/paydone'
let search='/catering/order/search'
let manage='/cateing/region/manage'


// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
    //开台
    let manages=(params={})=>vm.$u.post(manage,params)
    //订单完成
    let paydones=(params={})=>vm.$u.post(paydone,params)
    //用户合法性验证
    let userchecks=(params={})=>vm.$u.post(usercheck,params)
    //用户登录
    let logins=(params={})=>vm.$u.post(login,params)
    //菜单分类
    let categorys = (params={})=>vm.$u.post(category,params)
    //菜品资料
    let caterings = (params={})=>vm.$u.post(catering,params)
    //搜索
    let dishess=(params={})=>vm.$u.post(dishes,params)
    //菜品属性
    let exts=(params={})=>vm.$u.post(ext,params)
    //订单
    let orders=(params={})=>vm.$u.post(order,params)
    //订单预结算
    let readytopays=(params={})=>vm.$u.post(readytopay,params)
    //支付
    let pays=(params={})=>vm.$u.post(pay,params)
    //付款结果
    let querys=(params={})=>vm.$u.post(query,params)
    //支付成功订单
    let searchs=(params={})=>vm.$u.post(search,params)
    //退款
    let backs=(params={})=>vm.$u.post(back,params)
    // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
    vm.$u.api = {manages,exts,searchs,paydones,userchecks,logins,categorys,caterings,dishess,orders,readytopays,pays,querys,backs};
}

export default {
    install
}