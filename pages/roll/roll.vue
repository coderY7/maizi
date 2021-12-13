<template>
	<view>
    <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
	</view>
</template>

<script>
	export default {
    data() {
      return {
        list: [{
          name: '优惠券'
        }, {
          name: '卡包'
        }],
        current: 0
      }
    },
    methods: {
      change(index) {
        this.current = index;
      }
    }
	}
</script>

<style lang="scss">

</style>
