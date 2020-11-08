<template>
	<view class="collection-code">
		<view class="title">微信收款码：</view>
		<view class="upload-body">
			<tui-upload class="upload-img" limit="1"
						:value="value1"
						:serverUrl="serverUrl"
						 @complete="result1"
						 @remove="remove1"></tui-upload>
		</view>
		<view class="title">支付宝收款码：</view>
		<view class="upload-body">
			<tui-upload class="upload-img" limit="1"
						:value="value2"
						:serverUrl="serverUrl"
						 @complete="result2"
						 @remove="remove2"></tui-upload>
		</view>
		<view class="info">请上传收款码（至少上传一个）</view>
	</view>
</template>

<script>
	import config from '@/config'
	import {paramsSet} from "@/api";
	import {mapGetters} from "vuex";
	export default {
		data() {
			return {
				imageData: ['',''],
				//上传地址
				serverUrl: config.baseUrl.updateFileUrl,
				value1:[], //初始化图片
				value2:[] //初始化图片
			}
		},
		computed:{
			...mapGetters({
				userInfo:'getUserInfo'
			})
		},
		onLoad(){
			let images = this.userInfo.withdrawQrCode.split(',');
			this.value1 = images[0] ? [images[0]] : []
			this.value2 = images[1] ? [images[1]] : []
			this.imageData = images
		},
		methods: {
			result1: function(e) {
                console.log(e);
                let {imgArr,status} = e;
				this.value1 = imgArr
				if (imgArr.length > 0 && status === 1){
					this.imageData[0] = imgArr[0];
					this.uploadFile()
				}
			},
			remove1: function(e) {
				//移除图片
				this.value1 = []
				this.imageData[0] = ''
				this.uploadFile(false)
			},
			result2: function(e) {
				let {imgArr,status} = e;
				this.value2 = imgArr
				if (imgArr.length > 0 && status === 1){
					this.imageData[1] = imgArr[0]
					this.uploadFile()
				}
			},
			remove2: function(e) {
				//移除图片
				this.value2 = []
				this.imageData[1] = ''
				this.uploadFile(false)
			},
			//上传
			uploadFile(flag = true){
				paramsSet({qr_code: this.imageData.join(',')}, 'post').then(res=>{
					this.$store.commit('setUserInfoWithdrawQrCode', this.imageData.join(','))
					uni.showToast({
						title:flag ? '上传成功！' : '删除',
						duration: 2000
					})
				})
			}
		}
	}
</script>

<style lang="less">
page{
	background-color: #f6f6f6;
}

.collection-code {
	display: inline-block;
	width: 100%;

	.info {
		width: 100%;
		padding: 20rpx;
		font-size: 32rpx;
	}
	.title {
		font-size: 36rpx;
		padding: 20rpx;
	}
	.upload-body{
		width: 100%;
		height: 400rpx;
		display: flex;
		align-items: center;
		.upload-img {
			padding-left: 20rpx;
			/deep/.tui-image-item,
			/deep/.tui-item-img,
			/deep/.tui-upload-add{
				width: 400rpx;
				height: 400rpx;
				background: #FFFFFF;
			}

		}
	}
}
</style>
