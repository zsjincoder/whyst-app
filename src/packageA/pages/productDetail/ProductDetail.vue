<template>
    <view>
        <view class="product-image">
            <image   src="/static/logo.png"></image>
        </view>

        <view class="tui-pro-detail">
            <view class="tui-product-title tui-border-radius">
                <view class="tui-pro-pricebox tui-padding">
                    <view class="tui-pro-price">
                        <view>
                            <text>￥</text>
                            <text class="tui-price">49</text>
                            <text>.00</text>
                        </view>
                    </view>
                </view>
                <view class="tui-original-price tui-gray">
                    价格
                    <text class="tui-line-through">￥199.00</text>
                </view>
                <view class="tui-pro-titbox">
                    <view class="tui-pro-title">谈判官明星同款耳坠韩国气质简约显脸瘦的耳环女百搭个性长款耳钉 个性水滴耳环【A2】</view>
<!--                    <button open-type="share" class="tui-share-btn tui-share-position" @tap="onShare">-->
<!--                        <tui-tag type="gray" shape="circleLeft" padding="12rpx 16rpx">-->
<!--                            <view class="tui-share-box">-->
<!--                                <tui-icon name="partake" color="#999" :size="15"></tui-icon>-->
<!--                                <text class="tui-share-text tui-gray tui-size">分享</text>-->
<!--                            </view>-->
<!--                        </tui-tag>-->
<!--                    </button>-->
                </view>
                <view class="tui-padding">
                    <view class="tui-sub-title tui-size tui-gray">此商品将于2019-06-28,10点结束闪购特卖，时尚美饰联合专场</view>
                    <view class="tui-sale-info tui-size tui-gray">
<!--                        <view>快递：0.00</view>-->
                        <view>月销2000</view>
                        <view>浙江杭州</view>
                    </view>
                </view>
            </view>

            <view class="tui-nomore-box">
                <tui-nomore text="商品详情" backgroundColor="#f6f6f6"></tui-nomore>
            </view>
            <view class="tui-product-img tui-radius-all">
                dvdvsdvs
            </view>
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
                    <tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="submit">立即购买</tui-button>
                </view>
            </view>
        </view>

        <!--底部操作栏-->
    </view>
</template>

<script>
export default {
    name: "ProductDetail",
    methods:{
        toNav(url){
            uni.switchTab({
                url
            })
        },
        submit(){
            uni.navigateTo({
                url:"/pages/submitOrder/submitOrder"
            })
        }
    }
}
</script>

<style scoped lang="less">
page{
    background: #F6F6F6;
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
</style>