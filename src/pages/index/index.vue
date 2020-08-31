<template>
    <view class="home">
        <view class="tui-header-box" :style="{height:top+'rpx'}">
        </view>
        <view class="tui-mybg-box">
            <view class="tui-header-center">
                <u-avatar
                    class="user-avatar"
                    :src="src"
                    size="large"
                    :show-sex="true"
                    :show-level="true"></u-avatar>
                <view class="tui-info">
                    <view class="tui-nickname">呼噜猪zzZ
                        <image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image>
                    </view>
                    <view class="tui-explain">VIP会员…</view>
                </view>
                <view class="tui-btn-edit">
                    <tui-button type="white" :plain="true" shape="circle" width="128rpx" height="50rpx" :size="32"
                                @click="toRecords('/pages/personal_center/personalCenter')">编辑
                    </tui-button>
                </view>
            </view>
        </view>
        <view class="content_box">
            <view class="c_b_box">
                <view class="i_space">
                    <tui-list-view unlined="all">
                        <tui-list-cell @click="toRecords('/pages/wallet/wallet')" :lineLeft="false" :radius="true" :padding="'39rpx 26rpx 39rpx 26rpx'"
                                       :arrow="true">
                            <view class="tui-item-box">
                                <!--                                <image class="tui-msg-icon" src="/static/font-icon/bill.png"></image>-->
                                <tui-icon name="wallet" :size="52" unit="rpx" :color="'#4a77e8'"></tui-icon>
                                <view class="tui-msg-name">我的收益</view>
                            </view>
                        </tui-list-cell>
                    </tui-list-view>
                </view>
                <view class="active">
                    <view v-for="(item, index) in operate"
                          class="active-item"
                          :key="index"
                          @click="toRecords(item.path)">
                        <image class="active-item-icon" :src="item.img"></image>
                        <text>{{ item.name }}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            top: 0,
            webURL: "https://www.thorui.cn/wx",
            src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2800645550,2486998227&fm=26&gp=0.jpg',
            userName: "张三",
            operate: [
                {name: '我的团队', img: "/static/index-icon/team.png", path: '/pages/team/team'},
                {name: '我要推广', img: "/static/index-icon/tg.png", path: ''},
                {name: '购物商城', img: '/static/index-icon/mall.png', path: '/pages/Mall/Mall'},
                {name: '我的订单', img: '/static/index-icon/order.png', path: '/pages/myOrder/myOrder'},
                {name: '服务网点', img: '/static/index-icon/wd.png', path: '/pages/offlineOutlets/OfflineOutlets'},
                {name: '平台公告', img: '/static/index-icon/ad.png', path: ''},
                {name: '商家入驻', img: '/static/index-icon/sj.png', path: ''},
                {name: 'VIP学习中心', img: '/static/index-icon/xx.png', path: ''},
            ]
        }
    },
    onLoad() {
        let obj = {};
        // #ifdef MP-WEIXIN
        obj = wx.getMenuButtonBoundingClientRect();
        uni.getSystemInfo({
            success: (res) => {
                console.log(res);
                this.top = res.statusBarHeight * 2;
            }
        })
        // #endif

    },
    methods: {
        toRecords(url) {
            if (url === '/pages/Mall/Mall'){
                uni.switchTab({
                    url
                })
            }else {
                uni.navigateTo({
                    url
                })
            }
        }
    }
}
</script>

<style
    scoped
    lang="less">
@import "index.css";

page {
    background: #F6F6F6!important;
}

.i_space {
    margin-top: 12rpx;
}

.tui-item-box {
    width: 100%;
    display: flex;
    align-items: center;
    // justify-content: space-between;
}

.tui-msg-name {
    font-size: 32rpx;
    font-weight: bold;
    color: rgb(20, 53, 111);
    margin-left: 31rpx;

}

.tui-msg-icon {
    width: 48rpx;
    height: 48rpx;
    // margin-left:23rpx;
}

.c_b_box {
    position: absolute;
    padding: 0 30rpx;
    box-sizing: border-box;
    top: 294rpx;
    left: 0;
}

.home {
    width: 100%;
    box-sizing: border-box;
    //padding: 0 10rpx;

    .home-header {
        margin-top: 10rpx;
        display: flex;
        width: 100%;
        height: 180rpx;
        align-items: center;
        background: #fff;
        border-radius: 8rpx;

        .user-avatar {
            margin-left: 15rpx;
        }

        .user-name {
            display: flex;
            width: 78%;
            font-size: 34rpx;
            margin-left: 30rpx;
            justify-content: space-between;

            .user-n {
                font-size: 36rpx;
                font-weight: bold;
            }

            .user-level {
                font-size: 28rpx;
                color: #777;
            }

            .user-setting {
                color: #1ba2ea;
                font-size: 32rpx;
            }
        }
    }

    .v-con {
        width: 100%;
        height: 200rpx;
        margin-top: 10rpx;
        background: #FFFFFF;
        border-radius: 5px;

        .v-con-item {
            display: flex;
            width: 50%;
            height: 50%;
            float: left;
            align-items: center;
            justify-content: center;

            &:hover {
                content: "";
                background: #eeeeee;
            }
        }
    }

    .active {
        //margin-top: 10rpx;
        width: 100%;
        color: rgb(20, 53, 111);

        .active-item {
            display: flex;
            width: 50%;
            height: 160rpx;
            font-size: 32rpx;
            background: #FFFFFF;
            float: left;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border-bottom: 1px #F6F6F6 solid;

            .active-item-icon {
                width: 2em;
                height: 2em;
                /*vertical-align: -0.15em;*/
                fill: currentColor;
                overflow: hidden;
                margin-bottom: 10rpx;
            }
        }
    }
}
</style>
