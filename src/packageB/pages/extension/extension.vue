<template>
	<view class="extension" @longpress="shareEQ">
		<image src="/static/tg/tg.jpg" class="img" mode="widthFix"></image>
		<view class="share">
			<image src="/static/images/share.png" mode="widthFix"></image>
			<text>分享</text>
			<button type="primary" open-type='share'></button>
		</view>
		<view class="qr-body">
			<image :src="codeUrl" @click="identify"></image>
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
		onShareAppMessage: function (res) {
			return {
				title: '五衡益生堂小程序',
				path: '/pages/index/index'
			}
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
			identify(){
				wx.previewImage({
					urls:[this.qrCode],
					success: function(res) {
						console.log('success');
					},
					fail: function(res) {
						console.log('fail');
					},
				})
			},
            shareEQ(){
				uni.showModal({
					title: '提示',
					content: '确定保存二维码？',
					success:(res)=>{
						if (res.confirm){
							uni.downloadFile({
								url: this.codeUrl,
								success: (res)=> {
									wx.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function (data) {
											uni.showToast({
												title: '保存成功!',
											})
										},
										fail: function (err) {
											if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
												uni.showToast({
													title: '保存失败!',
													icon: 'none'
												})
											}
										},
									})

								}
							})
						}
					}
				})
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


	.share {
		position: absolute;
		top: 50rpx;
		right: 60rpx;
		width: 60rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		image {
			width: 60rpx;
			height: 60rpx;
		}

		text {
			margin-top: 10rpx;
			font-size: 26rpx;
			color: silver;
		}

		button {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}

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
