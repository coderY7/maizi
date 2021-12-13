<template>
  <view>
    <view class="mask-bg" @touchmove.stop.prevent :class="visible ? 'bg-show' : 'bg-hidden'">
      <!-- #ifdef H5 -->
      <view class="fake-area"></view>
      <!-- #endif -->
      <view class="main-area" :class="visible ? 'modal-show' : 'modal-hidden'">
        <view class="modal-area">
          <image src="/static/images/share.png" class="handle-btn" style="right: 86rpx;"  @tap="$emit('cancel')"></image>
          <image src="/static/images/close.png" class="handle-btn" style="right: 20rpx;" @tap="closeModal"></image>
          <view class="good-image-box"><image :src="productData ? imgurl+productData.big_img_path: '/static/images/default.png'" mode="widthFix"></image></view>
          <scroll-view scroll-y="true">
            <view class="scroll-inner_box">
              <text class="good-name">{{ productData.spmc}}</text>
              <view style="font-size: 28rpx; color: #555;margin: 10rpx 0;">产品描述</view>
              <view>{{productData.description}}</view>
              <view class="status-item">
                <view class="status-title">{{ productData.dishesextlist[0].groupname }}</view>
                <view class="status-tags">
                  <view v-for="(item1, index1) in productData.dishesextlist[0].extitems" :key="item1.ext_name + index1">
                    <view
                        class="tags-item2"
                        :style="{
												color: item1.isDefault ? activeTextColor : normalTextColor,
												backgroundColor: item1.isDefault ? activeBgColor : normalBgColor
											}"
                        @tap="chooseTag(item1, index1)"
                    >
                      {{ item1.ext_name }}
                      <text
                          class="tags-pri"
                          :style="{ color: item1.isDefault ? activeTextColor : activeBgColor }"
                          v-if="item1.ext_price > 0"
                          :class="{ 'active-text': item1.isDefault }"
                      >
                        ￥{{item1.ext_price}}
                      </text>
                    </view>
                  </view>
                </view>
              </view>
              <view class="status-title">{{ productData.dishesextlist[1].groupname }}</view>
              <view class="list" v-for="(item,key) in productData.dishesextlist[1].extitems" :key="key">
                <checkbox-group @change="checkboxChange(item,key)">
                  <view style="display: flex;justify-content: space-between;">
                    <view>
                      <label class="radio">
                        <checkbox :checked="item.isDefault"/>
                      </label> {{item.ext_name}}：<text>￥ {{item.ext_price}}</text>
                    </view>
                    <view class="list-list" v-if="item.isDefault">
                      <view class="Button" @click="plus(item,key)">+</view>
                      <view class="number">{{item.ext_quantity}}</view>
                      <view class="Button" @click="reduce(item,key)">-</view>
                    </view>
                  </view>
                </checkbox-group>
              </view>

              <view class="status-item">
                <view class="status-title">{{ productData.dishesextlist[2].groupname }}</view>
                <view class="status-tags">
                  <view v-for="(item1, index1) in productData.dishesextlist[2].extitems" :key="item1.ext_name + index1">
                    <view
                        class="tags-item2"
                        :style="{
												color: item1.isDefault ? activeTextColor : normalTextColor,
												backgroundColor: item1.isDefault ? activeBgColor : normalBgColor
											}"
                        @tap="chooseTag2(item1, index1)"
                    >
                      {{ item1.ext_name }}
                      <text
                          class="tags-pri"
                          :style="{ color: item1.isDefault ? activeTextColor : activeBgColor }"
                          v-if="item1.ext_price > 0"
                          :class="{ 'active-text': item1.isDefault }"
                      >
                        ￥{{item1.ext_price}}
                      </text>
                    </view>
                  </view>
                </view>
              </view>


              <view class="status-item">
                <view class="status-title">{{ productData.dishesextlist[3].groupname }}</view>
                <view class="status-tags">
                  <view v-for="(item1, index1) in productData.dishesextlist[3].extitems" :key="item1.ext_name + index1">
                    <view
                        class="tags-item2"
                        :style="{
												color: item1.isDefault ? activeTextColor : normalTextColor,
												backgroundColor: item1.isDefault ? activeBgColor : normalBgColor
											}"
                        @tap="chooseTag3(item1, index1)"
                    >
                      {{ item1.ext_name }}
                      <text
                          class="tags-pri"
                          :style="{ color: item1.isDefault ? activeTextColor : activeBgColor }"
                          v-if="item1.ext_price > 0"
                          :class="{ 'active-text': item1.isDefault }"
                      >
                        ￥{{item1.ext_price}}
                      </text>
                    </view>
                  </view>
                </view>
              </view>


              <view class="status-item">
                <view class="status-title">{{ productData.dishesextlist[4].groupname }}</view>
                <view class="status-tags">
                  <view v-for="(item1, index1) in productData.dishesextlist[4].extitems" :key="item1.ext_name + index1">
                    <view
                        class="tags-item2"
                        :style="{
												color: item1.isDefault ? activeTextColor : normalTextColor,
												backgroundColor: item1.isDefault ? activeBgColor : normalBgColor
											}"
                        @tap="chooseTag4(item1, index1)"
                    >
                      {{ item1.ext_name }}
                      <text
                          class="tags-pri"
                          :style="{ color: item1.isDefault ? activeTextColor : activeBgColor }"
                          v-if="item1.ext_price > 0"
                          :class="{ 'active-text': item1.isDefault }"
                      >
                        ￥{{item1.ext_price}}
                      </text>
                    </view>
                  </view>
                </view>
              </view>

            </view>
          </scroll-view>

          <view class="bottom-btn-box">
            <view class="status-box">
              <view class="left-status">
                <text class="pri-text" :style="{ color: activeBgColor }">￥{{ productData.shownPrice?productData.shownPrice:productData.nsjg }}</text>
                <text class="status-text">{{ choosedText }}</text>
              </view>
              <actions :number="productData.number" @add="add" @minus="minus"></actions>
            </view>
            <view class="btn-box"><u-button :bgColor="activeBgColor" :textColor="activeTextColor" btnWidth="600rpx" @click="addToCart">加入购物袋</u-button></view>
          </view>
        </view>
      </view>
      <view class="fake-area2"></view>
    </view>
  </view>
</template>

<script>
import Actions from '../actions/actions.vue'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => {
        return {};
      }
    },
    //底色
    activeBgColor: {
    	type: String,
    	default: '#dba871'
    },
    normalBgColor: {
    	type: String,
    	default: '#efefef'
    },
    // 普通文字色
    normalTextColor: {
    	type: String,
    	default: '#333333'
    },
    // 选中文字色
    activeTextColor: {
    	type: String,
    	default: '#ffffff'
    },
    // 普通星星色
    normalStarColor: {
    	type: String,
    	default: '#dba871'
    },
    // 选中星星色
    activeStarColor: {
    	type: String,
    	default: '#fdf292'
    }
  },

  components: {
    Actions
  },
  watch: {
    product(val) {
      this.productData = JSON.parse(JSON.stringify(val));
      console.log(this.productData);
      this.$set(this.productData, 'number', 1);
    }
  },

  data() {
    return {
      number: 1,
      shownPrice: 0,
      choosedText: '',
      imgurl:"http://api.mzsale.cn/",
      productData: {},
      zxprice:0,
      extlist:[],//附加属性
ext_zxprice:'',
      ext_quantity:'1',
      flownum:'0',
      value:'1'
    };
  },
  updated() {
    this.updateChoosedText();
  },
  onShow(){
    let data=this.productData.dishesextlist[1].extitems
    console.log('data',data)
  },
  methods: {

    checkboxChange(value,key){
      var value=this.productData.dishesextlist[1].extitems[key]
      console.log(value,key)
      value.ext_quantity=1
      if(value.isDefault==undefined){
        value.isDefault=true
        value.ext_zxprice=value.ext_quantity * value.ext_price
        this.pitch()
      }else if(value.isDefault){
        value.isDefault=undefined
        console.log(value)
        this.pitch()
      }
    },
    plus(value,key){
      var value=this.productData.dishesextlist[1].extitems[key]
      value.ext_quantity=Number(value.ext_quantity)+1
      value.ext_zxprice=value.ext_price * value.ext_quantity;
      this.pitch()
    },
    reduce(value,key){
      var value=this.productData.dishesextlist[1].extitems[key]
      if(value.ext_quantity<=1){
        return value.ext_quantity=1
      }
      value.ext_quantity=Number(value.ext_quantity)-1
      value.ext_zxprice=value.ext_price * value.ext_quantity;
      this.pitch()
    },


    chooseTag(rowIndex=0, itemIndex) {
      var unity=this.productData.dishesextlist[rowIndex].extitems[itemIndex]
      this.$set(unity, 'isDefault', 'true');
      this.$set(unity, 'ext_zxprice', '0');
      console.log(unity)
      unity.ext_quantity=1

      unity.ext_zxprice=unity.ext_price * 1
      if(rowIndex!=1){
        console.log(rowIndex,itemIndex)
        this.productData.dishesextlist[rowIndex].extitems.map(item => {
          item.isDefault = false;
        });
        this.$set(unity, 'isDefault', true);
      }
      this.pitch()
    },


    chooseTag1(index1) {
      var unity=this.productData.dishesextlist[1].extitems[index1]
      console.log(unity)
       this.$set(unity, 'isDefault', true);
       this.$set(unity, 'ext_zxprice', '0');
      console.log(unity)
      //unity.ext_quantity=this.ext_quantity
      unity.ext_zxprice=unity.ext_price * unity.ext_quantity;
      console.log(unity.ext_zxprice)
      this.pitch()
    },
   adds(item1){
     item1.ext_quantity=this._data.ext_quantity
     console.log(item1,this._data.ext_quantity)
   },


    chooseTag2(rowIndex=2, itemIndex) {
      var unity=this.productData.dishesextlist[rowIndex].extitems[itemIndex]
      this.$set(unity, 'isDefault', true);
      this.$set(unity, 'ext_zxprice', '0');
      unity.ext_quantity=1

      unity.ext_zxprice=unity.ext_price * 1
      if(rowIndex!=1){
        console.log(rowIndex,itemIndex)
        this.productData.dishesextlist[rowIndex].extitems.map(item => {
          item.isDefault = false;
        });
        this.$set(unity, 'isDefault', true);
      }
      this.pitch()
    },

    chooseTag3(rowIndex=3, itemIndex) {
      var unity=this.productData.dishesextlist[rowIndex].extitems[itemIndex]
      this.$set(unity, 'isDefault', true);
      this.$set(unity, 'ext_zxprice', '0');
      unity.ext_quantity=1

      unity.ext_zxprice=unity.ext_price * 1
      if(rowIndex!=1){
        console.log(rowIndex,itemIndex)
        this.productData.dishesextlist[rowIndex].extitems.map(item => {
          item.isDefault = false;
        });
        this.$set(unity, 'isDefault', true);
      }
      this.pitch()
    },

    chooseTag4(rowIndex=4, itemIndex) {
      var unity=this.productData.dishesextlist[rowIndex].extitems[itemIndex]
      this.$set(unity, 'isDefault', true);
      this.$set(unity, 'ext_zxprice', '0');
      unity.ext_quantity=1
      unity.ext_zxprice=unity.ext_price * 1
      if(rowIndex!=1){
        console.log(rowIndex,itemIndex)
        this.productData.dishesextlist[rowIndex].extitems.map(item => {
          item.isDefault = false;
        });
        this.$set(unity, 'isDefault', true);
      }
      this.pitch()
    },


    // 关闭modal
    closeModal() {
      this.$emit('cancel');
    },
    shareGoods() {
      this.$emit('share', {});
    },
    // 计算总价（商品+加料）
    calcOverprice() {
      let pri =0;
      this.productData.dishesextlist.forEach(item => {
        item.extitems.forEach(item1 => {
          if (item1.isDefault) {
            console.log('单个属性价格',item1.ext_price * item1.ext_quantity)
            pri += parseInt(item1.ext_price * item1.ext_quantity);
          }
        });
      });
      console.log('附加属性总价:',pri)
      this.productData.price=this.productData.nsjg + pri
      this.productData.zxprice=this.productData.nsjg+ pri
      this.productData.shownPrice=this.productData.number * this.productData.price;
      console.log(this.productData.shownPrice);
      this.updateChoosedText();
    },

    add() {
      this.productData.number += 1
      this.calcOverprice()
    },
    minus() {
      if(this.productData.number == 1) {
        return
      }
      this.productData.number -= 1
      this.calcOverprice()
    },
    //更新
    updateChoosedText() {
      let tempArr = [];
      this.productData.dishesextlist.map(item => {
        item.extitems.map(item1 => {
          if (item1.isDefault) {
              tempArr.push(item1.ext_name);
          }
        });
      });
      this.choosedText = tempArr.join(',');
    },
   //选中
    pitch(){
      let pitch=[];
      console.log( this.productData.dishesextlist)
      this.productData.dishesextlist.map(item => {
        item.extitems.map(item1 => {
          if (item1.isDefault) {
            pitch.push(item1);
          }
        });
      });
      console.log(pitch)
      this.productData.extlist=pitch
      this.calcOverprice();
    },
    // 加入购物车
    addToCart() {
      if(this.productData.extlist){
        this.productData.extlist.map(item => {
          // if (item.isDefault) {
          //   item.isDefault=undefined;
          //   item.ext_desc=undefined;
          // }
        });
        this.productData.choosedText=this.choosedText
        let goodslist={
          price: this.productData.nsjg,
          extlist:this.productData.extlist,
          spsmm:this.productData.spsmm,
          zxprice:this.productData.zxprice,
          quantity:this.productData.number,
          flownum: this.flownum++,
          discount: '0',
          spbm:this.productData.spbm,
        }
        this.productData.goodslist=goodslist;
        const product = {...this.productData}
        this.$emit('add-to-cart', product)
        console.log(product)
      }
      //未选择规格
      else {
        this.productData.choosedText=this.choosedText
        console.log(this.productData)
        let goodslist={
          price: this.productData.nsjg,
          extlist:[],
          spsmm:this.productData.spsmm,
          zxprice:this.productData.nsjg,
          quantity:this.productData.number,
          flownum: this.flownum++,
          discount: '0',
          spbm:this.productData.spbm,
        }
        this.productData.goodslist=goodslist;
        const product = {...this.productData}
        this.$emit('add-to-cart', product)
        console.log(product)
      }
    }
  }
};
</script>

<style>
.mask-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 999;
  transition: all 0.2s linear;
}

.modal-show {
  visibility: visible;
  transform: scale(1);
}

.bg-show {
  background-color: rgba(0, 0, 0, 0.5);
  visibility: visible;
}

.bg-hidden {
  background-color: rgba(255, 255, 255, 0);
  visibility: hidden;
}

.modal-hidden {
  visibility: hidden;
  transform: scale(0);
}

.fake-area {
  width: 100%;
  height: 128rpx;
}

.fake-area2 {
  height: 98rpx;
  width: 100%;
}

.main-area {
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;
}

.modal-area {
  width: 88%;
  background-color: #ffffff;
  border-radius: 8rpx;
  overflow: hidden;
  position: relative;
}

.handle-btn {
  width: 42rpx;
  height: 42rpx;
  display: block;
  position: absolute;
  top: 20rpx;
  z-index: 99;
}

.bottom-btn-box {
  width: 100%;
}

.btn-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
  box-sizing: border-box;
}

.status-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx 0 30rpx;
  box-sizing: border-box;
}

.left-status {
  display: flex;
  flex-direction: column;
}

.pri-text {
  font-size: 34rpx;
}

.status-text {
  color: #9a9a9a;
  font-size: 30rpx;
  overflow: hidden;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.count-box {
  display: flex;
  align-items: center;
}

.count-box image {
  width: 56rpx;
  height: 56rpx;
  display: block;
}

.count-box text {
  display: inline-flex;
  width: 60rpx;
  height: 48rpx;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
}

.good-image-box image {
  width: 100%;
  max-height: 440rpx;
  display: block;
}

.scroll-inner_box {
  padding: 10rpx 30rpx;
  box-sizing: border-box;
  /* #ifndef H5 */
  max-height: 320rpx;
  /* #endif */
  /* #ifdef H5 */
  max-height: 400rpx;
  /* #endif */
}

.good-name {
  font-size: 36rpx;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  line-height: 24rpx;
  color: #909090;
  background-color: #dadada;
  border-radius: 4rpx;
  padding: 10rpx 20rpx;
  transform: scale(0.8);
  transform-origin: left;
  margin-right: -20rpx;
}

.description-text {
  display: inline-block;
  color: #555555;
  font-size: 28rpx;
  line-height: 32rpx;
}

.status-item {
  display: flex;
  flex-direction: column;
}

.status-title {
  font-size: 28rpx;
  color: #555555;
  padding: 10rpx 0;
  box-sizing: border-box;
}

.status-tags {
  display: flex;
  flex-wrap: wrap;
  font-size: 24rpx;
}

.tags-item2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  line-height: 24rpx;
  color: #333;
  /* background-color: #efefef; */
  border-radius: 4rpx;
  padding: 10rpx 24rpx;
  margin-right: 16rpx;
  margin-bottom: 16rpx;
  position: relative;
}

.tags-pri {
  color: #dca371;
  padding-left: 8rpx;
  transform: scale(0.8);
}

.recommend {
  position: absolute;
  top: 4rpx;
  right: 4rpx;
  width: 24rpx;
  height: 24rpx;
  display: block;
}

.active-tag {
  background-color: #dba871 !important;
  color: #ffffff !important;
}

.active-text {
  color: #ffffff;
}
.star-shrink {
  transform: scale(0.7);
  transform-origin: right;
}
.sign {
  font-size: 46rpx !important;
}
.list input{
  margin: 0 10upx;
  width: 80upx;
  border: 1upx solid #007AFF;
}
.list .list-list{
  display: flex;
  margin-top: 10upx;
}
.list .Button{
  background-color: #dca371;
  width: 50upx;
  height: 48upx;
  text-align: center;
  line-height: 48upx;
}
</style>
