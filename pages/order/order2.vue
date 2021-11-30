<template>
  <view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      dataList: [
        {
          id: 1,
          store: '夏日流星限定贩卖',
          deal: '交易成功',
          goodsList: [
            {
              goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
              title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
              type: '灰色;M',
              deliveryTime: '付款后30天内发货',
              price: '348.58',
              number: 2
            },
            {
              goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
              title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
              type: '45cm;S',
              deliveryTime: '付款后30天内发货',
              price: '135.00',
              number: 1
            }
          ]
        },
        {
          id: 2,
          store: '江南皮革厂',
          deal: '交易失败',
          goodsList: [
            {
              goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
              title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
              type: '粉色;M',
              deliveryTime: '付款后7天内发货',
              price: '128.05',
              number: 1
            }
          ]
        },
        {
          id: 5,
          store: '三星旗舰店',
          deal: '交易成功',
          goodsList: [
            {
              goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
              title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
              type: '识别效率高',
              deliveryTime: '使用方便',
              price: '451',
              number: 9
            }
          ]
        }
      ],
      list: [
        {
          name: '待付款'
        },
        {
          name: '待发货'
        },
        {
          name: '待收货'
        },
        {
          name: '待评价',
        }
      ],
      current: 0,

    };
  },
  onLoad() {

  },
  computed: {

  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
page {
  height: 100%;
  background-color: #f2f2f2;
}
</style>


