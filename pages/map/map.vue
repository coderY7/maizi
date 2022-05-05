<template>
  <view>
    <map :latitude="latitude" :longitude="longitude" :markers="covers" style="width: 100%; height: 300px;">
    </map>
  </view>
</template>

<script>
var QQMapWX = require('../../common/qqmap-wx-jssdk.min');
export default {
  data() {
    return {
      id: 0, // 使用 marker点击事件 需要填写id
      title: 'map',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [{
        latitude: 39.909,
        longitude: 116.39742,
      }]
    }
  },
  onShow() {
    console.log('显示地图1')
    // wx.chooseLocation({
    //   success: (res)=> {
    //      var tencentMap = new QQMapWX({
    //       key: 'OYVBZ-YWJ3J-UTEFB-KILGE-2WYX6-GEB2D'
    //     })
    //     tencentMap.reverseGeocoder({
    //       location: {
    //         longitude: res.longitude,
    //         latitude: res.latitude
    //       },
    //       success:(res)=> {
    //         console.log('获取地图详细位置',res.result.address)
    //       }
    //     })

    //   },
    // })

  },
  methods: {}
}
</script>

<style>

</style>
