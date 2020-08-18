<template>
    <view class="home">
        <view class="home-header">
            <u-avatar
                class="user-avatar"
                :src="src"
                size="large"
                :show-sex="true"
                :show-level="true"></u-avatar>
            <view class="user-name">
                <p>您是：{{ userName }}&nbsp;&nbsp;VIP会员</p>
                <span class="user-setting">设置</span>
            </view>
        </view>
        <view class="v-con">
            <view class="v-con-item"
                  style="border-right: 1px silver solid;border-bottom: 1px silver solid">余额：1000积分
            </view>
            <view class="v-con-item"
                  style="border-bottom: 1px silver solid">收支记录
            </view>
            <view class="v-con-item"
                  style="border-right: 1px silver solid">充值
            </view>
            <view class="v-con-item">体现</view>
        </view>
        <view class="active">
            <view class="active-item">

            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            src: require("../../static/logo.png"),
            userName: "张三"
        }
    },
    onLoad() {
        console.log(this.$u);
    },
    methods: {}
}
</script>

<style
    scoped
    lang="less">
.home {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10rpx;

    .home-header {
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
            margin-left: 15rpx;
            justify-content: space-between;

            .user-setting {
                color: #1ba2ea;
                font-size: 32rpx;
            }
        }
    }

    .v-con {
        width: 100%;
        height: 200rpx;
        margin-top: 20rpx;
        color: #777779;
        background: #FFFFFF;
        border-radius: 5px;
        border: 1px silver solid;

        .v-con-item {
            display: flex;
            width: 50%;
            height: 50%;
            float: left;
            align-items: center;
            justify-content: center;
        }
    }

    .active {
        margin-top: 10rpx;
        width: 100%;

        .active-item {
            width: 50%;
            height: 80rpx;
            background: cadetblue;
            float: left;
        }
    }
}
</style>
