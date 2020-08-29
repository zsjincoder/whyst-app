<template>
    <view>
        <tui-sticky :scrollTop="scrollTop" stickyHeight="104rpx" container>
            <template v-slot:header>
                <!-- 搜索栏 -->
                <view class="search page_space">
                    <view class="search_box">
                        <view class="s_icon">
                            <tui-icon :name="Font.name" :size="Font.size" :unit="Font.unit" :color="Font.color"></tui-icon>
                        </view>
                        <input class="search_input" type="text" v-model="search" @confirm="" confirm-type="search"
                               placeholder="养生产品" />
                        <view class="s_delete" v-if="search !== ''" @click="search = ''">
                            <tui-icon :name="'close-fill'" :size="32" :unit="'rpx'" :color="'#999'"></tui-icon>
                        </view>
                    </view>
                    <view class="screening" @click="">
                        搜索
                    </view>
                </view>
            </template>
            <template v-slot:content>
                <view class="tui-product-container">
                    <block v-for="(item, index) in productList" :key="index">
                        <!--商品列表-->
                        <view class="tui-pro-item tui-flex-list"   @click="detail()">
                            <image src="/static/logo.png"
                                   class="tui-pro-img tui-proimg-list"
                                   mode="widthFix" />
                            <view class="tui-pro-content">
                                <view class="tui-pro-tit">{{ item.name }}</view>
                                <view>
                                    <view class="tui-pro-price">
                                        <text class="tui-sale-price">￥{{ item.sale }}</text>
                                        <text class="tui-factory-price">￥{{ item.factory }}</text>
                                    </view>
                                    <view class="tui-pro-pay">{{ item.payNum }}人付款</view>
                                </view>
                            </view>
                        </view>
                        <!--商品列表-->
                    </block>
                </view>
            </template>
        </tui-sticky>
        <load-more :loading="loading"></load-more>
    </view>
</template>

<script>
import LoadMore from "@/components/load_more/LoadMore";
export default {
name: "Mall",
    components: {LoadMore},
    data(){
        return{
            scrollTop:0,
            search:"",
            loading:"loadmore",
            Font: {
                name: "search-2",
                size: 32,
                unit: "rpx",
                color: "#B2B2B2"
            },
            productList: [
                {
                    img: 1,
                    name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
                    sale: 599,
                    factory: 899,
                    payNum: 2342
                },
                {
                    img: 2,
                    name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
                    sale: 29,
                    factory: 69,
                    payNum: 999
                },
                {
                    img: 3,
                    name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
                    sale: 299,
                    factory: 699,
                    payNum: 666
                },
                {
                    img: 4,
                    name: '百雀羚套装女补水保湿护肤品',
                    sale: 1599,
                    factory: 2899,
                    payNum: 236
                },
                {
                    img: 5,
                    name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
                    sale: 599,
                    factory: 899,
                    payNum: 2399
                },
                {
                    img: 6,
                    name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
                    sale: 599,
                    factory: 899,
                    payNum: 2399
                },
                {
                    img: 1,
                    name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜',
                    sale: 599,
                    factory: 899,
                    payNum: 2342
                },
                {
                    img: 2,
                    name: '德国DMK进口牛奶',
                    sale: 29,
                    factory: 69,
                    payNum: 999
                },
                {
                    img: 3,
                    name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
                    sale: 299,
                    factory: 699,
                    payNum: 666
                },
                {
                    img: 4,
                    name: '百雀羚套装女补水保湿护肤品',
                    sale: 1599,
                    factory: 2899,
                    payNum: 236
                }
            ],
        }
    },
    //页面滚动执行方式
    onPageScroll(e) {
        this.scrollTop = e.scrollTop
    },
    methods:{
        detail(){
            uni.navigateTo({
                url:"/pages/productDetail/ProductDetail"
            })
        }
  
    }
}
</script>

<style scoped lang="less">
page{
    background: #F6F6F6;
}
/*搜索*/
.page_space{
    padding: 0 30rpx;
    box-sizing: border-box;
}
.search {
    width: 100%;
    //z-index: 999;
    margin-top: 0;
    padding-top: 17rpx;
    padding-bottom: 17rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24rpx;
    background: #FFFFFF;
.search_box {
    display: flex;
    width: 598rpx;
    height: 68rpx;
    background: #F1F1F1;
    border-radius: 33rpx;
}

.s_icon{
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 32rpx;
}

.s_delete {
    display: flex;
    align-items: center;
    height: 100%;
    width: 60rpx;
}

.search_input {
    margin-left: 17rpx;
    width: 460rpx;
    height: 100%;
    background: #F1F1F1;
}
.screening {
    font-size: 28rpx;
    color: #76d5fa;
}
}
//商品列表
.tui-product-container {
    flex: 1;
    margin-right: 10rpx;
}

.tui-product-container:last-child {
    margin-right: 0;
}

.tui-pro-item {
    width: 100%;
    margin-bottom: 10rpx;
    background: #fff;
    box-sizing: border-box;
    border-radius: 12rpx;
    overflow: hidden;
    padding:  0 20rpx;
    transition: all 0.15s ease-in-out;
}

.tui-flex-list {
    display: flex;
    margin-bottom:4rpx !important;
}

.tui-pro-img {
    width: 100%;
    display: block;
}

.tui-proimg-list {
    width: 260rpx;
    height: 260rpx !important;
    flex-shrink: 0;
    border-radius: 12rpx;
}

.tui-pro-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20rpx;
}

.tui-pro-tit {
    color: #2e2e2e;
    font-size: 26rpx;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.tui-pro-price {
    padding-top: 18rpx;
}

.tui-sale-price {
    font-size: 34rpx;
    font-weight: 500;
    color: #e41f19;
}

.tui-factory-price {
    font-size: 24rpx;
    color: #a0a0a0;
    text-decoration: line-through;
    padding-left: 12rpx;
}

.tui-pro-pay {
    padding-top: 10rpx;
    font-size: 24rpx;
    color: #656565;
}
</style>