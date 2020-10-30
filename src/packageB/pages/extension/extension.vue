<template>
	<view class="extension">
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
