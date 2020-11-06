<template>
    <view>
        <!--banner-->
        <view class="tui-banner-swiper">
            <swiper :autoplay="true" :interval="5000" :duration="150" :circular="true" :style="{ height: scrollH + 'px' }"
                    @change="bannerChange">
                <block v-for="(item, index) in goodsInfo.images" :key="index">
                    <swiper-item :data-index="index" @tap.stop="previewImage">
                        <image :src="item" class="tui-slide-image" :style="{ height: scrollH + 'px' ,width:'100%'}" />
                    </swiper-item>
                </block>
            </swiper>
            <view class="tui-banner-tag">
                <tui-tag padding="12rpx 18rpx" type="translucent" shape="circleLeft" :scaleMultiple="0.82" originRight>{{ bannerIndex + 1 }}/{{ goodsInfo.images.length || 0 }}</tui-tag>
            </view>
        </view>

        <!--banner-->

        <view class="tui-pro-detail">
            <view class="tui-product-title tui-border-radius">
                <view class="tui-pro-pricebox tui-padding">
                    <view class="tui-pro-price">
                        <view>
                            <text>￥</text>
                            <text class="tui-price">{{goodsInfo.lowPrice || 0}}</text>
                            <text>.00</text>
                        </view>
                    </view>
                </view>
                <view class="tui-original-price tui-gray">
                    价格
                    <text class="tui-line-through">￥{{goodsInfo.lowPrice + 200 || 0}}</text>
                </view>
                <view class="tui-pro-titbox">
                    <view class="tui-pro-title">{{goodsInfo.name || ''}}</view>
                </view>
                <view class="tui-padding">
                    <view class="tui-sub-title tui-size tui-gray">{{goodsInfo.description || ''}}</view>
                    <view class="tui-sale-info tui-size tui-gray">
                        <view>快递：0.00</view>
                        <view>月销:{{goodsInfo.salesStatistics.monthlySales || 0}}</view>
                        <view>重庆</view>
                    </view>
                </view>
            </view>

            <view class="tui-basic-info tui-mtop tui-radius-all">
                <view class="tui-list-cell" @tap="openPopup">
                    <view class="tui-bold tui-cell-title">已选</view>
                    <view class="tui-selected-box">{{chooseText || ''}}</view>
                    <view class="tui-ml-auto">
                        <tui-icon name="more-fill" :size="20" color="#666"></tui-icon>
                    </view>
                </view>
                <view class="tui-list-cell tui-last">
                    <view class="tui-bold tui-cell-title">运费</view>
                    <view class="tui-selected-box">免运费</view>
                </view>
                <view class="tui-guarantee">
                    <view class="tui-guarantee-item">
                        <tui-icon name="circle-selected" :size="14" color="#999"></tui-icon>
                        <text class="tui-pl">快速配送</text>
                    </view>
                    <view class="tui-guarantee-item">
                        <tui-icon name="circle-selected" :size="14" color="#999"></tui-icon>
                        <text class="tui-pl">极速审核</text>
                    </view>
                </view>
            </view>

            <view class="tui-nomore-box">
                <tui-nomore text="商品详情" backgroundColor="#f6f6f6"></tui-nomore>
            </view>
            <view class="tui-product-img tui-radius-all"
                  v-html="goodsInfo.detail"></view>
            <tui-nomore text="已经到最底了" backgroundColor="#f7f7f7"></tui-nomore>
            <view class="tui-safearea-bottom"></view>
        </view>
        <!--底部操作栏-->
        <view class="tui-operation">
            <view class="tui-operation-left tui-col-5">
                <view class="tui-operation-item"
                      hover-class="tui-opcity"
                      :hover-stay-time="150"
                      @click="toNav('/pages/index/index')">
                    <tui-icon name="home" :size="22" color="#333"></tui-icon>
                    <view class="tui-operation-text tui-scale-small">会员中心</view>
                </view>
                <view class="tui-operation-item"
                      hover-class="tui-opcity"
                      :hover-stay-time="150"
                      @click="toNav('/pages/Mall/Mall')">
                    <tui-icon name="shop" :size="22" color="#333"></tui-icon>
                    <view class="tui-operation-text tui-scale-small">商城</view>
                </view>
            </view>
            <view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
                <view class="tui-flex-1">
                    <tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="openPopup">立即购买</tui-button>
                </view>
            </view>
        </view>

        <!--底部操作栏-->

        <!---顶部下拉菜单-->

        <!--底部选择层-->
        <tui-bottom-popup :show="popupShow" @close="popupShow = false">
            <view class="tui-popup-box">
                <view class="tui-product-box tui-padding">
                    <image :src="popupInfo.image || '/static/images/zwsp.png'" class="tui-popup-img"></image>
                    <view class="tui-popup-price">
                        <view v-if="!popupInfo.goodsName" class="tui-amount tui-bold">暂无商品</view>
                        <view class="tui-amount tui-bold">￥{{popupInfo.price || '无'}}</view>
                        <view class="tui-number">库存:{{popupInfo.stock || '无'}}</view>
                    </view>
                </view>
                <scroll-view scroll-y class="tui-popup-scroll">
                    <view class="tui-scrollview-box">
                        <view v-for="(info,key) in goodsInfo.specification" :key="key">
                            <view class="tui-bold tui-attr-title">{{info.name || ''}}</view>
                            <view class="tui-attr-box">
                                <view v-for="(i,k) in info.values"
                                      :key="k"
                                      class="tui-attr-item"
                                      :class="isInArray(specificationValueList,specificationValueChooseList, i.value)
                                              ? isInArray(specificationValueList,specificationValueChooseList, i.value)
                                              : ''"
                                      @click="setChoose(key,i)">{{i.value}}</view>
                            </view>
                        </view>

                        <view class="tui-number-box tui-bold tui-attr-title">
                            <view class="tui-attr-title">数量</view>
                            <tui-numberbox :max="99" :min="1" :value="value" @change="change"></tui-numberbox>
                        </view>
                    </view>
                </scroll-view>
                <view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
                    <view class="tui-flex-1">
                        <tui-button height="72rpx" :size="28" type="warning" shape="circle" @click="submit">立即购买</tui-button>
                    </view>
                </view>
                <view class="tui-right">
                    <tui-icon name="close-fill" color="#999" :size="20" @click="popupShow = false"></tui-icon>
                </view>
            </view>
        </tui-bottom-popup>
        <!--底部选择层-->
    </view>
</template>

<script>
    import {detail, goodsAttrs} from "@/api";
import {isInArray} from "@/libs/utils";
    import {mapMutations} from "vuex";

export default {
    name: "ProductDetail",
    data(){
      return {
          height: 64, //header高度
          top: 26, //标题图标距离顶部距离
          scrollH: 0, //滚动总高度
          opcity: 0,
          iconOpcity: 0.5,
          bannerIndex: 0,
          popupShow: false,
          value: 1,
          vip: 0,
          goodsInfo: {

          },

          //所有规格值
          specificationValueList:[],
          //选中的规格
          specificationValueChoose:[],
          popupInfo:{

          }
      }
    },
    computed:{
        specificationValueChooseList(){
            return this.specificationValueChoose.map(item=> item.value)
        },
        chooseText(){
            return (this.goodsInfo.name || '') + ',' + this.specificationValueChooseList.join(',')
        }
    },
    onLoad(option){
        let obj = {};
        // #ifdef MP-WEIXIN
        obj = wx.getMenuButtonBoundingClientRect();
        // #endif
        // #ifdef MP-BAIDU
        obj = swan.getMenuButtonBoundingClientRect();
        // #endif
        // #ifdef MP-ALIPAY
        my.hideAddToDesktopMenu();
        // #endif

        setTimeout(() => {
            uni.getSystemInfo({
                success: res => {
                    this.width = obj.left || res.windowWidth;
                    this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
                    this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
                    this.scrollH = res.windowWidth;
                }
            });
        }, 0);
        option.hasOwnProperty('id') && this.getGoodsInfo(option.id)
        option.hasOwnProperty('vip') && (this.vip = option.vip)
    },
    methods:{
        ...mapMutations({
            setSaveGoodsInfo: 'setSaveGoodsInfo'
        }),

        isInArray: isInArray,
        //选择规格
        setChoose(index, item){
            if (this.specificationValueList.indexOf(item.value) === -1){
                uni.showToast({
                    title:'该规格当前不能选择',
                    icon:'none'
                })
                return
            }
            this.$set(this.specificationValueChoose, index, {value: item.value, id: item.id})
            this.checkInventory()
        },
        //openPopup
        openPopup(){
            this.popupShow = true
            this.checkInventory()
        },
        //根据规格查询库存
        checkInventory(){
            let params = {
                specValues: this.specificationValueChoose.map(item => item.id),
                spuId: this.goodsInfo.id,
            }
            goodsAttrs(params,'get').then(res =>{
                this.popupInfo = res.list[0] || {}
                this.goodsInfo.lowPrice = this.popupInfo.price
            })
        },
        //购买数量
        change(e) {
            this.value = e.value;
        },
        //banner
        bannerChange(e) {
            this.bannerIndex = e.detail.current;
        },
        //图片预览
        previewImage(e) {
            let index = e.currentTarget.dataset.index;
            uni.previewImage({
                current: this.banner[index],
                urls: this.banner
            });
        },
        //获取商品详情
        getGoodsInfo(id){
            detail({}, id,'get').then(res=>{
                console.log(res);
                this.goodsInfo = res
                // this.specificationValueList
                this.goodsInfo.specification.forEach((item,index)=>{
                    if (item.hasOwnProperty('values') && item.values.length > 0){
                        item.values.forEach((list) =>{
                            if (this.specificationValueList.indexOf(list.value) === -1){
                                this.specificationValueList.push(list.value)
                            }
                        })
                    }
                })
                this.goodsInfo.specification.forEach((item,index) => {
                    if (item.values.length > 0){
                        for (let i = 0; i < item.values.length; i++){
                            if (this.specificationValueList.indexOf(item.values[i].value) !== -1) {
                                this.$set(this.specificationValueChoose, index ,{value: item.values[i].value, id:item.values[i].id})
                                break;
                            }
                        }
                    }
                })
                console.log(this.specificationValueList);
                console.log(this.specificationValueChoose);
            })
        },
        toNav(url){
            uni.switchTab({
                url
            })
        },
        submit(){
            console.log(this.popupInfo);
            if (Object.keys(this.popupInfo).length === 0){
                uni.showToast({
                    title:'暂无商品',
                    icon:'none'
                })
                return
            }
            let goods = {
                goodsInfo: this.popupInfo,
                specificationValueChoose: this.specificationValueChoose,
                value: this.value
            }
            this.setSaveGoodsInfo(goods)
            uni.navigateTo({
                url:"/packageA/pages/submitOrder/submitOrder?vip=" + this.vip
            })
        }
    }
}
</script>

<style scoped lang="less">
page{
    background: #F6F6F6;
}
.tui-banner-swiper {
    position: relative;
}

.tui-banner-tag {
    position: absolute;
    color: #fff;
    bottom: 30rpx;
    right: 0;
}


.product-image{
    width:100%;
    height:auto;
    image{
        height: 750rpx;
        width: 750rpx;
    }
}


.tui-pro-detail {
    box-sizing: border-box;
    color: #333;
}

.tui-product-title {
    background: #fff;
    padding: 30rpx 0;
}

.tui-pro-pricebox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ff201f;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 44rpx;
}

.tui-pro-price {
    display: flex;
    align-items: center;
}

.tui-price {
    font-size: 58rpx;
}

.tui-original-price {
    font-size: 26rpx;
    line-height: 26rpx;
    padding: 10rpx 30rpx;
    box-sizing: border-box;
}

.tui-line-through {
    text-decoration: line-through;
}

.tui-collection {
    color: #333;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 44rpx;
}

.tui-scale-collection {
    transform: scale(0.7);
    transform-origin: center 90%;
    line-height: 24rpx;
    font-weight: normal;
    margin-top: 4rpx;
}

.tui-pro-titbox {
    font-size: 32rpx;
    font-weight: 500;
    position: relative;
    padding: 0 150rpx 0 30rpx;
    box-sizing: border-box;
}

.tui-pro-title {
    padding-top: 20rpx;
}

.tui-share-btn {
    display: block;
    background: transparent;
    margin: 0;
    padding: 0;
    border-radius: 0;
    border: 0;
}

.tui-share-btn::after {
    border: 0;
}

.tui-share-box {
    display: flex;
    align-items: center;
}

.tui-share-position {
    position: absolute;
    right: 0;
    top: 30rpx;
}

.tui-share-text {
    padding-left: 8rpx;
}

.tui-sub-title {
    padding: 20rpx 0;
    line-height: 32rpx;
}

.tui-sale-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 30rpx;
}

.tui-discount-box {
    background: #fff;
}

.tui-list-cell {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    line-height: 26rpx;
    padding: 36rpx 30rpx;
    box-sizing: border-box;
}

.tui-right {
    position: absolute;
    right: 30rpx;
    top: 30rpx;
}

.tui-top40 {
    top: 40rpx !important;
}

.tui-bold {
    font-weight: bold;
}

.tui-list-cell::after {
    content: '';
    position: absolute;
    border-bottom: 1rpx solid #eaeef1;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    bottom: 0;
    right: 0;
    left: 126rpx;
}

.tui-last::after {
    border-bottom: 0 !important;
}

.tui-flex-center {
    display: flex;
    align-items: center;
}


.tui-cell-title {
    width: 66rpx;
    padding-right: 30rpx;
    flex-shrink: 0;
}

.tui-promotion-box {
    display: flex;
    align-items: center;
    padding: 10rpx 0;
    width: 80%;
}

.tui-promotion-box text {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tui-basic-info {
    background: #fff;
}

.tui-addr-box {
    width: 76%;
}

.tui-addr-item {
    padding: 10rpx;
    line-height: 34rpx;
}

.tui-guarantee {
    background: #fdfdfd;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 30rpx 30rpx 30rpx;
    font-size: 24rpx;
}

.tui-guarantee-item {
    color: #999;
    padding-right: 30rpx;
    padding-top: 10rpx;
}

.tui-pl {
    padding-left: 4rpx;
}

.tui-cmt-box {
    background: #fff;
}

.tui-between {
    justify-content: space-between !important;
}

.tui-cmt-all {
    color: #ff201f;
    padding-right: 8rpx;
}

.tui-cmt-content {
    font-size: 26rpx;
}

.tui-cmt-user {
    display: flex;
    align-items: center;
}

.tui-acatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    display: block;
    margin-right: 16rpx;
}

.tui-cmt {
    padding: 14rpx 0;
}

.tui-attr {
    font-size: 24rpx;
    color: #999;
    padding: 6rpx 0;
}

.tui-cmt-btn {
    padding: 50rpx 0 30rpx 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tui-nomore-box {
    padding-top: 10rpx;
}

.tui-product-img {
    display: flex;
    flex-direction: column;
    transform: translateZ(0);
}

.tui-product-img image {
    width: 100%;
    display: block;
}	.tui-pro-detail {
         box-sizing: border-box;
         color: #333;
     }

.tui-product-title {
    background: #fff;
    padding: 30rpx 0;
}

.tui-pro-pricebox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ff201f;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 44rpx;
}

.tui-pro-price {
    display: flex;
    align-items: center;
}

.tui-price {
    font-size: 58rpx;
}

.tui-original-price {
    font-size: 26rpx;
    line-height: 26rpx;
    padding: 10rpx 30rpx;
    box-sizing: border-box;
}

.tui-line-through {
    text-decoration: line-through;
}

.tui-collection {
    color: #333;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 44rpx;
}

.tui-scale-collection {
    transform: scale(0.7);
    transform-origin: center 90%;
    line-height: 24rpx;
    font-weight: normal;
    margin-top: 4rpx;
}

.tui-pro-titbox {
    font-size: 32rpx;
    font-weight: 500;
    position: relative;
    padding: 0 150rpx 0 30rpx;
    box-sizing: border-box;
}

.tui-pro-title {
    padding-top: 20rpx;
}

.tui-share-btn {
    display: block;
    background: transparent;
    margin: 0;
    padding: 0;
    border-radius: 0;
    border: 0;
}

.tui-share-btn::after {
    border: 0;
}

.tui-share-box {
    display: flex;
    align-items: center;
}

.tui-share-position {
    position: absolute;
    right: 0;
    top: 30rpx;
}

.tui-share-text {
    padding-left: 8rpx;
}

.tui-sub-title {
    padding: 20rpx 0;
    line-height: 32rpx;
}

.tui-sale-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 30rpx;
}

.tui-discount-box {
    background: #fff;
}

.tui-list-cell {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    line-height: 26rpx;
    padding: 36rpx 30rpx;
    box-sizing: border-box;
}

.tui-right {
    position: absolute;
    right: 30rpx;
    top: 30rpx;
}

.tui-top40 {
    top: 40rpx !important;
}

.tui-bold {
    font-weight: bold;
}

.tui-list-cell::after {
    content: '';
    position: absolute;
    border-bottom: 1rpx solid #eaeef1;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    bottom: 0;
    right: 0;
    left: 126rpx;
}

.tui-last::after {
    border-bottom: 0 !important;
}

.tui-flex-center {
    display: flex;
    align-items: center;
}


.tui-cell-title {
    width: 66rpx;
    padding-right: 30rpx;
    flex-shrink: 0;
}

.tui-promotion-box {
    display: flex;
    align-items: center;
    padding: 10rpx 0;
    width: 80%;
}

.tui-promotion-box text {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tui-basic-info {
    background: #fff;
}

.tui-addr-box {
    width: 76%;
}

.tui-addr-item {
    padding: 10rpx;
    line-height: 34rpx;
}

.tui-guarantee {
    background: #fdfdfd;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 30rpx 30rpx 30rpx;
    font-size: 24rpx;
}

.tui-guarantee-item {
    color: #999;
    padding-right: 30rpx;
    padding-top: 10rpx;
}

.tui-pl {
    padding-left: 4rpx;
}

.tui-cmt-box {
    background: #fff;
}

.tui-between {
    justify-content: space-between !important;
}

.tui-cmt-all {
    color: #ff201f;
    padding-right: 8rpx;
}

.tui-cmt-content {
    font-size: 26rpx;
}

.tui-cmt-user {
    display: flex;
    align-items: center;
}

.tui-acatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 30rpx;
    display: block;
    margin-right: 16rpx;
}

.tui-cmt {
    padding: 14rpx 0;
}

.tui-attr {
    font-size: 24rpx;
    color: #999;
    padding: 6rpx 0;
}

.tui-cmt-btn {
    padding: 50rpx 0 30rpx 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tui-nomore-box {
    padding-top: 10rpx;
}

.tui-product-img {
    display: flex;
    flex-direction: column;
    transform: translateZ(0);
}

.tui-product-img image {
    width: 100%;
    display: block;
}
.tui-padding {
    padding: 0 30rpx;
    box-sizing: border-box;
}

.tui-ml-auto {
    margin-left: auto;
}

/* #ifdef H5 */
.tui-ptop {
    padding-top: 44px;
}

/* #endif */

.tui-size {
    font-size: 24rpx;
    line-height: 24rpx;
}

.tui-gray {
    color: #999;
}

.tui-icon-red {
    color: #ff201f;
}

.tui-border-radius {
    border-bottom-left-radius: 24rpx;
    border-bottom-right-radius: 24rpx;
    overflow: hidden;
}

.tui-radius-all {
    border-radius: 24rpx;
    overflow: hidden;
}


.tui-col-7 {
    width: 58.33333333%;
}

.tui-col-5 {
    width: 41.66666667%;
}

.tui-operation {
    width: 100%;
    height: 100rpx;
    background: rgba(255, 255, 255, 0.98);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    bottom: 0;
    left: 0;
    padding-bottom: env(safe-area-inset-bottom);
}

.tui-safearea-bottom {
    width: 100%;
    height: env(safe-area-inset-bottom);
}

.tui-operation::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    border-top: 1rpx solid #eaeef1;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}

.tui-operation-left {
    display: flex;
    align-items: center;
}

.tui-operation-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
}

.tui-operation-text {
    font-size: 22rpx;
    color: #333;
}

.tui-opacity {
    opacity: 0.5;
}

.tui-scale-small {
    transform: scale(0.9);
    transform-origin: center center;
}

.tui-operation-right {
    height: 100rpx;
    padding-top: 0;
}

.tui-right-flex {
    display: flex;
    align-items: center;
    justify-content: center;
}

.tui-flex-1 {
    flex: 1;
    padding: 16rpx;
}

/*底部操作栏*/

/*底部选择弹层*/

.tui-popup-class {
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
    padding-bottom: env(safe-area-inset-bottom);
}

.tui-popup-box {
    position: relative;
    padding: 30rpx 0 100rpx 0;
}

.tui-popup-btn {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
}

/* .tui-popup-btn .tui-btn-class {
    width: 90% !important;
    display: block !important;
    font-size: 28rpx !important;
} */

/* .tui-icon-close {
    position: absolute;
    top: 30rpx;
    right: 30rpx;
} */

.tui-product-box {
    display: flex;
    align-items: flex-end;
    font-size: 24rpx;
    padding-bottom: 30rpx;
}

.tui-popup-img {
    height: 200rpx;
    width: 200rpx;
    border-radius: 24rpx;
    display: block;
}

.tui-popup-price {
    padding-left: 20rpx;
    padding-bottom: 8rpx;
}

.tui-amount {
    color: #ff201f;
    font-size: 36rpx;
}

.tui-number {
    font-size: 24rpx;
    line-height: 24rpx;
    padding-top: 12rpx;
    color: #999;
}

.tui-popup-scroll {
    height: 600rpx;
    font-size: 26rpx;
}

.tui-scrollview-box {
    padding: 0 30rpx 60rpx 30rpx;
    box-sizing: border-box;
}

.tui-attr-title {
    padding: 10rpx 0;
    color: #333;
}

.tui-attr-box {
    font-size: 0;
    padding: 20rpx 0;
}

.tui-attr-item {
    max-width: 100%;
    min-width: 200rpx;
    height: 64rpx;
    display: -webkit-inline-flex;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #f7f7f7;
    padding: 0 26rpx;
    box-sizing: border-box;
    border-radius: 32rpx;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    font-size: 26rpx;
}

.tui-attr-active {
    background: #fcedea !important;
    color: #e41f19;
    font-weight: bold;
    position: relative;
}

.tui-attr-active::after {
    content: '';
    position: absolute;
    border: 1rpx solid #e41f19;
    width: 100%;
    height: 100%;
    border-radius: 40rpx;
    left: 0;
    top: 0;
}

.tui-attr-disabled {
    background: #aaa9a9 !important;
    color: #e2e0e0;
    position: relative;
}

.tui-attr-disabled::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 40rpx;
    left: 0;
    top: 0;
}

.tui-number-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx 0 30rpx 0;
    box-sizing: border-box;
}

/*底部选择弹层*/
</style>
