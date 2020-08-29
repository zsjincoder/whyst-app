<template>
    <view class="box">
        <!-- 会员 -->
        <view class="member">您是尊敬的铂金会员</view>
        <!-- tab栏 -->
        <tui-sticky :scrollTop="scrollTop" stickyHeight="104rpx" container>
            <template v-slot:header>
                <view class="tab">
                    <view class="tab-item" v-for="(item,index) in tabList" :key="index" @click="changeTab(item)">
                        <view class="tab-title" :class="selectedId === item.id?'t-selected':''">
                            {{ `${item.name}(${item.number})` }}
                        </view>
                    </view>
                </view>
            </template>
            <template v-slot:content>
                <!--    人员列表    -->
                <view class="listener-list">
                    <view class="l-item page_space" v-for="(item,index) in indexInfo" :key="index" @click="toUserDetail()">
                        <view class="l-i-img">
                            <image :src="item.url"></image>
                        </view>
                        <view class="l-i-content">
                            <view class="layout">
                                <text class="l-i-name">昵称：{{ item.name }}</text>
                            </view>
                            <view class="l-i-name2">性别：{{item.sex}}</view>
                            <view class="l-i-name2 omit">简介：地方的房价第三方地方的房价第三方地方的房价第三方地方的房价第三方</view>
                            <view class="l-i-text omit">
                                加入日期：{{ item.date }}
                            </view>
                        </view>
                    </view>
                </view>
            </template>
        </tui-sticky>
        <load-more :loading="loading"></load-more>
    </view>
</template>

<script>
import LoadMore from "@/components/load_more/LoadMore";
export default {
    name: "team",
    components: {LoadMore},
    data() {
        return {
            loading:"loadmore",
            scrollTop:0,
            tabList: [
                {
                    id: 1,
                    name: "直接邀请",
                    number: 10
                },
                {
                    id: 2,
                    name: "我的团队",
                    number: 5
                }
            ],
            selectedId: 1,
            indexInfo: [
                {
                    url: "/static/logo.png",
                    id: 1,
                    name: "正杀鸡",
                    date: "2020-8-29",
                    sex: "男",
                },
                {
                    url: "/static/logo.png",
                    id: 2,
                    name: "xz",
                    date: "2020-8-29",
                    sex: "女",
                },
                {
                    url: "/static/logo.png",
                    id: 3,
                    name: "xz",
                    date: "2020-8-29",
                    sex: "女",
                },
                {
                    url: "/static/logo.png",
                    id: 2,
                    name: "xz",
                    date: "2020-8-29",
                    sex: "女",
                },
                {
                    url: "/static/logo.png",
                    id: 2,
                    name: "xz",
                    date: "2020-8-29",
                    sex: "女",
                },
                {
                    url: "/static/logo.png",
                    id: 2,
                    name: "xz",
                    date: "2020-8-29",
                    sex: "女",
                }
            ]
        }
    },
    //页面滚动执行方式
    onPageScroll(e) {
        this.scrollTop = e.scrollTop
    },

    onReachBottom() {
        console.log(123);
    },
    methods: {
        changeTab(e) {
            this.selectedId = e.id;
        }
    }
}
</script>

<style scoped lang="less">
page {
    background: #F6F6F6;
}
.omit{
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}
.box {
    padding-top: 10rpx;
    box-sizing: border-box;
}

.member {
    width: 100%;
    padding: 0 30rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #333333;
    background: #FFFFFF;
    height: 150rpx;
    display: flex;
    align-items: center;
    margin-bottom: 5rpx;
}

.tab {
    //margin-top: 5rpx;
    width: 100%;
    height: 88rpx;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tab-item {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .tab-title {
            min-width: 148rpx;
            height: 84rpx;
            line-height: 84rpx;
            text-align: center;
            font-size: 28rpx;
            color: rgba(33, 33, 33, 1);
            border-bottom: 4rpx solid #FFFFFF;
        }

        .t-selected {
            border-bottom: 4rpx solid #81daf5;
            color: #69b7ea;
            font-size: 30rpx;
        }
    }
}

// 倾听者列表
.listener-list {
    .l-item {
        padding: 30rpx 30rpx;
        box-sizing: border-box;
        width: 100%;
        min-height: 150rpx;
        display: flex;
        background: #fff;
        margin-bottom:10rpx;
        //align-items: center;

        .l-i-img {
            position: relative;

            image {
                width: 100rpx;
                height: 100rpx;
                border-radius: 10rpx;
            }
        }

        .l-i-content {
            min-height: 202rpx;
            margin-left: 29rpx;
            width: 458rpx;
            position: relative;

            .l-top {
                margin-top: 15rpx;
            }


            .l-i-name {
                font-size: 32rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(34, 34, 34, 1);
            }
            .l-i-name2 {
                margin-top: 10rpx;
                font-size:28rpx;
                font-family: PingFang SC;
                color: rgba(34, 34, 34, 1);
                -webkit-line-clamp: 2;
            }


            .l-i-text {
                margin-top: 12rpx;
                font-size: 22rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(153, 153, 153, 1);
                line-height: 33rpx;
                -webkit-line-clamp: 2;
                /*这个数字是设置要显示省略号的行数*/
            }
        }
    }
}
</style>