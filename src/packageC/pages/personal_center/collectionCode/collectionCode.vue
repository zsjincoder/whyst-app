<template>
	<view class="collection-code">
		<view class="title">微信收款码：</view>
		<view class="upload-body">
			<tui-upload class="upload-img" limit="1"
						:value="value"
						:serverUrl="serverUrl"
						 @complete="result"
						 @remove="remove"></tui-upload>
		</view>
		<view class="title">支付宝收款码：</view>
		<view class="upload-body">
			<tui-upload class="upload-img" limit="1"
						:value="value"
						:serverUrl="serverUrl"
						 @complete="result"
						 @remove="remove"></tui-upload>
		</view>
		<view class="info">请上传收款码（至少上传一个）</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageData: [],
				//上传地址
				serverUrl: "https://api.thorui.cn/",
				value:[] //初始化图片
			}
		},
		methods: {
			result: function(e) {
				console.log(e)
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
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
		height: 500rpx;
		display: flex;
		align-items: center;
		.upload-img {
			padding-left: 20rpx;
			/deep/.tui-image-item,
			/deep/.tui-item-img,
			/deep/.tui-upload-add{
				width: 500rpx;
				height: 500rpx;
				background: #FFFFFF;
			}

		}
	}
}
</style>
