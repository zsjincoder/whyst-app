<template>
	<view class="extension" @longpress="shareEQ">
		<image src="/static/tg/tg.jpg" class="img" mode="widthFix"></image>
		<view class="qr-body">
			<image :src="codeUrl"></image>
		</view>
	</view>
</template>

<script>
	import {unLimit} from "@/api";

	export default {
		data() {
			return {
				codeUrl:''
			}
		},
		onShow(){
			this.getQR()
		},

		methods: {
			getQR(){
				unLimit({
					page:'pages/index/index',
					width:'516px',
					isHyaline: false,
					lineColor: {"r":255,"g":255,"b":0}
					},'post').then(res=>{
					let {codeUrl} = res;
					this.codeUrl = codeUrl || ''
				})
			},
            shareEQ(){
                uni.share({
                    provider: "weixin",
                    scene: "WXSceneSession",
                    type: 2,
                    title: "五衡益生堂分享",
                    summary: "我正在使用五衡益生堂小程序，赶紧跟我一起来体验！",
                    imageUrl: this.codeUrl,
                    success: function (res) {
                        console.log("success:" + JSON.stringify(res));
                        uni.showToast({
                            title: "分享成功"
                        })
                    },
                    fail: function (err) {
                        console.log("fail:" + JSON.stringify(err));
                        uni.showToast({
                            title: "分享失败"
                        })
                    }
                });
            }
		}
	}
</script>

<style lang="less">
	page{
		background: #1A1826;
	}
.extension {
	position: relative;
	width: 750rpx;
	height: 100%;

	.img{
		width: 750rpx;
		height: auto;
	}

	.qr-body {
		position: absolute;
		top: 950rpx;
		left: 240rpx;
		width: 258rpx;
		height: 258rpx;

		image{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
