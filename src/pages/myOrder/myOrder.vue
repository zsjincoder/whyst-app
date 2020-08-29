<template>
    <view>
        <view class="tui-order-item" v-for="(model,orderIndex) in 3" :key="orderIndex">
            <tui-list-cell :hover="false" :lineLeft="false">
                <view class="tui-goods-title">
                    <view>订单号：T201910000</view>
                    <view class="tui-order-status">失败</view>
                </view>
            </tui-list-cell>
            <tui-list-cell padding="0" @click="detail">
                <view class="tui-goods-item">
                    <image src="/static/logo.png" class="tui-goods-img"></image>
                    <view class="tui-goods-center">
                        <view class="tui-goods-name">欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）</view>
                        <view class="tui-goods-attr">黑色，50ml</view>
                    </view>
                    <view class="tui-price-right">
                        <view>￥298.00</view>
                        <view>x1</view>
                    </view>
                </view>
            </tui-list-cell>
            <tui-list-cell :hover="false" unlined>
                <view class="tui-goods-price">
                    <view>共4件商品 合计：</view>
                    <view class="tui-size-24">￥</view>
                    <view class="tui-price-large">1192</view>
                    <view class="tui-size-24">.00</view>
                </view>
            </tui-list-cell>
        </view>
        <load-more :loading="loading"></load-more>
    </view>
</template>

<script>
import LoadMore from "@/components/load_more/LoadMore";
export default {
    name: "myOrder",
    components: {LoadMore},
    data(){
        return{
            loading:"loadmore",
        }
    },
    methods:{
        detail(){
            uni.navigateTo({
                url:'/pages/orderDetail/orderDetail'
            })
        }
    }
}
</script>

<style scoped lang="less">
page{
    background: #F6F6F6;
}
.tui-order-item {
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
}

.tui-goods-title {
    width: 100%;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tui-order-status {
    color: #888;
    font-size: 26rpx;
}

.tui-goods-item {
    width: 100%;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
}

.tui-goods-img {
    width: 180rpx;
    height: 180rpx;
    display: block;
    flex-shrink: 0;
}

.tui-goods-center {
    flex: 1;
    padding: 20rpx 8rpx;
    box-sizing: border-box;
}

.tui-goods-name {
    max-width: 310rpx;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 26rpx;
    line-height: 32rpx;
}

.tui-goods-attr {
    font-size: 22rpx;
    color: #888888;
    line-height: 32rpx;
    padding-top: 20rpx;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.tui-price-right {
    text-align: right;
    font-size: 24rpx;
    color: #888888;
    line-height: 30rpx;
    padding-top: 20rpx;
}

.tui-color-red {
    color: #E41F19;
    padding-right: 30rpx;
}

.tui-goods-price {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 24rpx;
}

.tui-size-24 {
    font-size: 24rpx;
    line-height: 24rpx;
}

.tui-price-large {
    font-size: 32rpx;
    line-height: 30rpx;
    font-weight: 500;
}
</style>