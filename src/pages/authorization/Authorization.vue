<template>
    <view class="auth-body">
        <button type="primary" open-type="getUserInfo" @getuserinfo="onGetUserInfo">微信一键登录</button>
    </view>
</template>

<script>

    import {getUserInfo} from "@/libs/utils";

    export default {
        name: "Authorization",
        data() {
            return {}
        },
        methods: {
            onGetUserInfo(res){
                getUserInfo()
            }
        }
    }
</script>

<style scoped lang="less">
.auth-body{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
