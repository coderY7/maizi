<template>
  <view>12
  </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
    onLoad() {
      console.log('1212')
      this.scan()
    },
    onShow(){
      console.log('333')
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
              uni.setStorageSync('tablenumber', '1')
              uni.setStorageSync('fdbh', '808001');
              uni.setStorageSync('companyid', '800008');
              uni.setStorageSync('xsdbh', '');
              uni.setStorageSync('token', 'XMUGTMwd6RihQZEWBAqvh8OSwLhT95wd');
              //查询当前桌台订单信息
              this.$u.api.orders({
                access_token: uni.getStorageSync('token'),
                vtype: 'new',
                tableid: uni.getStorageSync('tableid'),
                fdbh: uni.getStorageSync('fdbh'),
                tablewaiter: uni.getStorageSync('syyid'),
                posid: uni.getStorageSync('posid'),
                tablenumber: uni.getStorageSync('tablenumber'),
              }).then((res) => {
                console.log('查询开台信息', res)
                //查询桌台订单信息
                if(res.error_code=='2'){
                  console.log('已有订单')
                  //已开台单号
                  uni.setStorageSync('xsdbh', res.xsdbh)
                  uni.setStorageSync('tablenumber', res.table_number)
                  this.$u.api.orders({
                    access_token: uni.getStorageSync('token'),
                    vtype: 'detail',
                    tableid: uni.getStorageSync('tableid'),
                    fdbh: uni.getStorageSync('fdbh'),
                    xsdbh: uni.getStorageSync('xsdbh')
                  }).then(res => {
                    let old = res;
                    uni.setStorageSync('old', old)
                    console.log('查询桌台订单明细：', res)
                    let cartold = [];
                    let countold=res.count;
                    uni.setStorageSync('flownumold',countold)
                    res.goodslist.forEach((item) => {
                      let choosedText = [];
                      let ext_zxprices = [];
                      item.extlist.forEach(res => {
                        choosedText.push(res.ext_name)
                        ext_zxprices.push(Number.parseInt(res.ext_zxprice))
                      })
                      let text = choosedText.join(',')
                      function sum(arr) {
                        return arr.reduce((prev, curr)=>{
                          return prev + curr;
                        },0);
                      }
                      let addzxprice=sum(ext_zxprices) //属性总价

                      cartold.push({
                        id: item.spbm,
                        cate_id: item.category_id,
                        name: item.spmc,
                        number: Number.parseInt(item.quantity) || 1,
                        is_single: item.is_single,
                        choosedText: text || '',
                        price: Number.parseInt(item.price),
                        zxprice: Number.parseInt(addzxprice) + Number.parseInt(item.price),
                        image: `http://cateapi.mzsale.cn/${item.small_img_path}`,
                        addzxprice:addzxprice,
                        goodslist: {
                          discount: item.discount,
                          extlist: item.extlist,
                          flownum: item.flownum,
                          price: Number.parseInt(item.price),
                          zxprice: Number.parseInt(addzxprice) + Number.parseInt(item.price),
                          quantity: Number.parseInt(item.quantity),
                          spbm: item.spbm,
                          spsmm: item.spsmm,
                        }
                      })
                    })
                    console.log('旧数据信息', cartold)
                    uni.setStorageSync('cartold', cartold)
                  })
                }
              })
              uni.switchTab({
                url: '/pages/main/main'
              });

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
