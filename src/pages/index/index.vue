<template>
    <view class="home">
        <view class="tui-header-box"
              :style="{height:top+'rpx'}">
        </view>
        <view class="home-header" :style="{marginTop: top+'rpx'}">
            <view class="user-info">
                <u-avatar
                    class="user-avatar"
                    :src="userInfo.headimgUrl || ''"
                    size="large"
                    :show-sex="true"
                    :sex-icon="userInfo.sex === 1 ? 'man' : 'woman'"
                    :show-level="true"></u-avatar>
                <view class="tui-info">
                    <view class="tui-nickname">
                        {{userInfo.nickname || ''}}
<!--                        <image src="/static/images/mall/my/icon_vip_3x.png" class="tui-img-vip"></image>-->
                    </view>
                    <view class="tui-explain">{{userInfo.levelName || ''}}</view>
                </view>
                <view class="tui-btn-edit">
                    <tui-icon name="setup"
                              :size="50"
                              unit="rpx"
                              color="#fff"
                              @click="toRecords('/pages/personal_center/personalCenter')"></tui-icon>
                </view>
            </view>
            <view class="my-income">
                <view class="income-con">
                    <view class="my-income-name">可用积分</view>
                    <view class="my-income-number">{{integral}}</view>
                </view>
                <text class="income-more"
                      @click="toRecords('/pages/wallet/wallet')">查看更多>></text>
            </view>
        </view>
            <view class="c_b_box" :style="{top: (470 + top) +'rpx'}">
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
        <!--  轮播  -->
        <view class="swiper-box">
            <swiper class="swiper"
                    :indicator-dots="indicatorDots"
                    :autoplay="autoplay"
                    :interval="interval"
                    :duration="duration">
                <swiper-item v-for="(item,key) in swiperList"
                             :key="key"
                             class="swiper-item" >
                    <image :src="item.img"></image>
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<script>
    import {banner, Integral} from "@/api";
    import {getUserInfoForStorage, judgeIsLogin} from "@/libs/utils";
import {mapGetters} from "vuex";

export default {
    data() {
        return {
            //用户积分
            integral: 0,


            //轮播参数
            autoplay:true,
            interval:1800,
            duration:500,
            indicatorDots:true,
            top: 0,
            webURL: "https://www.thorui.cn/wx",
            src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2800645550,2486998227&fm=26&gp=0.jpg',
            userName: "张三",
            operate: [
                {name: '我的团队', img: "/static/index-icon/team.png", path: '/pages/team/team'},
                {name: '我要推广', img: "/static/index-icon/tg.png", path: '/packageB/pages/extension/extension'},
                {name: '我的订单', img: '/static/index-icon/order.png', path: '/packageA/pages/myOrder/myOrder'},
                {name: '购物商城', img: '/static/index-icon/mall.png', path: '/pages/mall-over/mall-over'},
                {name: '服务网点', img: '/static/index-icon/wd.png', path: '/packageC/pages/offlineOutlets/OfflineOutlets'},
                {name: '商家入驻', img: '/static/index-icon/rz.png', path: '/packageB/pages/businessSettlement/businessSettlement'},
                {name: '业绩榜单', img: '/static/index-icon/bd.png', path: '/packageB/pages/rankingList/rankingList'},
                {name: '客服中心', img: '/static/index-icon/kfzx.png', path: '/packageB/pages/customer/customer'},
                {name: '帮助中心', img: '/static/index-icon/bzzx.png', path: '/packageB/pages/commonProblem/commonProblem'},
                {name: '平台公告', img: '/static/index-icon/ad.png', path: '/packageB/pages/platformAnnouncement/platformAnnouncement'},
                {name: 'VIP学习中心', img: '/static/index-icon/xx.png', path: ''},
            ],
            swiperList:[
                '/static/swiper/cw.jpg',
                '/static/swiper/xm.jpg',
            ]
        }
    },
    onLoad() {
        let obj = {};
        // #ifdef MP-WEIXIN
        obj = wx.getMenuButtonBoundingClientRect();
        uni.getSystemInfo({
            success: (res) => {
                this.top = res.statusBarHeight * 2;
            }
        })
        // #endif

    },
    onShow() {
        this.getBannerInfo()
        Integral({},'get').then(res=>{
            this.integral = res.integral;
        })
    },
    computed:{
      ...mapGetters({
          userInfo:'getUserInfo'
      })
    },
    methods: {
        //banner图
        getBannerInfo() {
            banner({}, 'get').then(res=>{
                this.swiperList = res.list || []
            })
        },
        //跳转地址
        toRecords(url) {
            if (url === '/pages/mall-over/mall-over') {
                uni.switchTab({url})
            } else {
                uni.navigateTo({url})
            }
        },
		getUserInfo(res){
			console.log('1'+JSON.stringify(res));
		},
        getUserInfoForStorage: getUserInfoForStorage,
    }
}
</script>

<style
    scoped
    lang="less">
@import "index.css";

/deep/page {
    background: #ffffff !important;
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
    padding: 0 30rpx;
    box-sizing: border-box;
    width: 100%;
    min-height: 704rpx;
}

.home {
    width: 100%;
    box-sizing: border-box;
    //padding: 0 10rpx;

    .home-header {
        position: relative;
        display: flex;
        width: 100%;
        height:450rpx;
        background: linear-gradient(0deg, #ffffff, rgb(42, 147, 239));

        .user-info {
            width: 750rpx;
            height: 280rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        }

        .my-income {
            display: flex;
            position: absolute;
            width: 90%;
            height: 180rpx;
            left: 5%;
            bottom: 0;
            border-radius: 20rpx;
            background: linear-gradient(-100deg, #71beff, #4184ea);;
            align-items: center;
            box-sizing: border-box;
            padding: 20rpx 30rpx;

            .income-con {
                width: 70%;

                .my-income-name {
                    font-size: 32rpx;
                    color: rgba(255, 255, 255, 0.7);
                }

                .my-income-number {
                    margin-top: 5rpx;
                    font-size: 60rpx;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                }
            }

            .income-more {
                color: #FFFFFF;
                font-size: 30rpx;
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
            width: 33%;
            height: 160rpx;
            font-size: 32rpx;
            float: left;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;

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
//轮播
.swiper-box{
    width: 100%;
    padding: 0 30rpx;
    margin-bottom: 50rpx;
    .swiper{
        //border-radius: 10rpx;
        width: 690rpx;
        height: 300rpx;
        .swiper-item{
            width: 100%;
            height: 100%;
            border-radius: 10rpx;
        }
        image{
            border-radius: 10rpx;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
