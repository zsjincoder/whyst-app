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
                <view class="tui-info" v-if="isLogin">
                    <view class="tui-nickname">
                        {{userInfo.nickname || ''}}
                    </view>
                    <view class="tui-explain">{{userInfo.levelName || ''}}</view>
                </view>
                <view class="tui-btn-edit" v-if="isLogin">
                    <tui-icon name="setup"
                              :size="50"
                              unit="rpx"
                              color="#fff"
                              @click="toRecords('/packageC/pages/personal_center/personalCenter')"></tui-icon>
                </view>
                <view v-if="!isLogin"
                      style="width: 70%;box-sizing: border-box;padding-left: 20rpx;color: #eee8d5"
                      @click="userLoginInfo">点击登录</view>
            </view>
            <view class="my-income">
                <view class="income-con">
                    <view class="my-income-name">可用积分</view>
                    <view class="my-income-number">{{integral}}</view>
                </view>
                <text class="income-more"
                      @click="toRecords('/packageC/pages/wallet/wallet')">查看更多>></text>
            </view>
        </view>
        <u-notice-bar mode="horizontal" :duration="2500" :is-circular="false" :list="list"
                      color="#6eb3e8"></u-notice-bar>
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
        
        <!--购物弹窗-->
        <view v-if="!goodModal && sceneCode" class="min-modal" @click="getVipGood()">
            vip
        </view>
        <tui-modal :show="goodModal" @cancel="goodModalEvent" :custom="true">
            <scroll-view scroll-y class="goods-modal">
                <image :src="vipGoodsInfo.goods.image" class="good-img"></image>
                <view class="good-name">{{vipGoodsInfo.goods.goodsName || '' }}</view>
                <view class="good-price">￥{{vipGoodsInfo.goods.price || 0}}</view>
                <text class="prompt">提示：立即购买即刻成为vip会员</text>
                <tui-button margin="28rpx 0 0" height="56rpx" type="danger" shape="circle" @click="shop(vipGoodsInfo.goods.spuId)">立即购买</tui-button>
                <view class="interests">
                    <view class="title">会员权益</view>
<!--                    <view class="interests-item" v-for="(v,i) in privilegeList" :key="i">-->
<!--                        <view class="item-label">{{v.label}}</view>-->
<!--                        <view class="item-value">{{v.value}}</view>-->
<!--                    </view>-->
                    <text class="interests-item" v-text="vipGoodsInfo.vipPower" selectable ></text>
                </view>
            </scroll-view>
        </tui-modal>
    </view>
</template>

<script>
import {banner, Integral, scrollMessage, vipGoods} from "@/api";
    import {getAuthorization, getUserInfoForStorage} from "@/libs/utils";
    import {mapGetters, mapMutations} from "vuex";
    import store from "@/store";

export default {
    data() {
        return {
            //用户积分
            integral: 0,

            list: [],

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
                {name: '我的团队', img: "/static/index-icon/team.png", path: '/packageC/pages/team/team'},
                {name: '我要推广', img: "/static/index-icon/tg.png", path: '/packageB/pages/extension/extension'},
                {name: '我的订单', img: '/static/index-icon/order.png', path: '/packageA/pages/myOrder/myOrder'},
                {name: '购物商城', img: '/static/index-icon/mall.png', path: '/pages/mall-over/mall-over'},
                {name: '服务网点', img: '/static/index-icon/wd.png', path: '/packageC/pages/offlineOutlets/OfflineOutlets'},
                {name: '商家入驻', img: '/static/index-icon/rz.png', path: '/packageB/pages/businessSettlement/businessSettlement'},
                {name: '业绩榜单', img: '/static/index-icon/bd.png', path: '/packageB/pages/rankingList/rankingList'},
                {name: '客服中心', img: '/static/index-icon/kfzx.png', path: '/packageB/pages/customer/customer'},
                {name: '帮助中心', img: '/static/index-icon/bzzx.png', path: '/packageB/pages/commonProblem/commonProblem'},
                {name: '平台公告', img: '/static/index-icon/ad.png', path: '/packageB/pages/platformAnnouncement/platformAnnouncement'},
                // {name: 'VIP学习中心', img: '/static/index-icon/xx.png', path: ''},
                {name: '我要核销', img: '/static/index-icon/hx.png', path: '/packageC/pages/coupon/Coupon'},
            ],
            swiperList:[
                '/static/swiper/cw.jpg',
                '/static/swiper/xm.jpg',
            ],

            //弹窗
            goodModal: false,
            vipGoodsInfo:{},

            //特权
            privilegeList: [
                {
                    label:'特权一',
                    value:'轻松拥有一份属于自己的大健康事业，为他人送健康，大爱无疆。'
                },
                {
                    label:'特权二',
                    value:'获得一份价值398元的中草药泥膏，泥膏功效：排寒、除湿、排毒、减肥、亚健康调理。'
                },
                {
                    label:'特权三',
                    value:'拥有一个无限大的资源平台，共享平台资源，海量的养身学习资料。'
                },
                {
                    label:'特权四',
                    value:'有限获得创业指导，平台倒是全程辅导展业工作。'
                }
            ]
        }
    },
    onLoad(options) {
        let obj = {};
        // #ifdef MP-WEIXIN
        obj = wx.getMenuButtonBoundingClientRect();
        uni.getSystemInfo({
            success: (res) => {
                this.top = res.statusBarHeight * 2;
            }
        })
        // #endif
        console.log(options);
        if (options.scene || options.promotionCode ) {
            console.log("has scene");
            const scene =options.promotionCode || decodeURIComponent(options.scene);
            this.setSceneCode(scene)
            this.getVipGood()
            console.log("scene is ", scene);
        } else {
            console.log("no scene");
        }
        console.log(this.sceneCode);
        getAuthorization()
    },
    onShow() {
        this.getBannerInfo()
        this.getGD()
        Integral({},'get').then(res=>{
            this.integral = res.integral;
        })
    },
    computed:{
      ...mapGetters({
          userInfo:'getUserInfo',
          sceneCode:'getSceneCode',
          isLogin:'getIsLogin'
      })
    },
    methods: {
        ...mapMutations({
            setSceneCode:'setSceneCode'
        }),
        //用户登录
        userLoginInfo(){
            if (this.$store.state.user.showLogin) return false
            this.$store.commit('setShowLogin', true)
            uni.showModal({
                title:'提示',
                content:'登录需用户授权,请先授权登录！',
                success:  (res)=> {
                    this.$store.commit('setShowLogin', false)
                    if (res.confirm) {
                        uni.redirectTo({
                            url:'/pages/authorization/Authorization'
                        })
                    }
                }
            })
        },
        //获取vip商品
        getVipGood(){
            vipGoods({},'get').then(res =>{
                console.log(res);
                this.vipGoodsInfo = res
                this.goodModal = true
            })
        },
        //购买商品
        shop(id = ''){
            uni.navigateTo({
                url: "/packageA/pages/productDetail/ProductDetail?vpi=1&id=" + id
            })
        },
        //弹窗
        goodModalEvent(){
            this.goodModal = false
        },

        //banner图
        getBannerInfo() {
            banner({}, 'get').then(res=>{
                this.swiperList = res || []
            })
        },
        getGD(){
            scrollMessage({page:1,limit:100}, 'get').then(res=>{
                let data = res.list || []
                this.list = data.map(item => item.message)
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
    position: relative;
    //padding: 0 10rpx;
    //小窗
    .min-modal {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 500rpx;
        right: -10rpx;
        width: 60rpx;
        height: 60rpx;
        color: #ffffff;
        background: #6eb3e8;
        font-size: 24rpx;
        border: 1px #9eeacf solid;
        border-radius: 20rpx;
        box-shadow: #33CDA1 -2rpx -2rpx 5rpx;
        animation: rotateEvent 1.5s;
        animation-iteration-count: infinite
    }

    @keyframes rotateEvent
    {
        0% {transform: rotate(-35deg);}
        100% {transform: rotate(-45deg);}
    }

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

    //弹窗
.goods-modal {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 850rpx;
    overflow-y: auto;

    .good-img {
        width: 100%;
    }

    .good-name {
        width: 100%;
        font-size: 28rpx;
        padding-top: 20rpx;
    }
    .good-price {
        width: 100%;
        font-size: 32rpx;
        padding-top: 10rpx;
        color: red;
    }

    .prompt {
        width: 100%;
        font-size: 24rpx;
        color: #fa4343;
    }

    .interests {
        margin-top: 20rpx;
        width: 100%;

        .title {
            width: 100%;
            text-align: center;
            font-weight: bold;
        }

        .interests-item{
            margin-top: 10rpx;
            width: 100%;
            color: #6e6e6f;
            font-size: 26rpx;

            .item-label {
                font-weight: bold;
                color: #f15353;
                font-size: 30rpx;
            }

            .item-value {
                margin-top: 5rpx;
                font-size: 26rpx;
                word-break: break-all;
                color: #6e6e6f;
            }
        }
    }
}
</style>
