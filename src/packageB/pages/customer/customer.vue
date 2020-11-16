<template>
	<view class="customer">
		<view class="time">{{$u.timeFormat(new Date().getTime(), 'yyyy年mm月dd日 MM:ss')}}</view>
		<view class="title">扫码或长按复制微信号添加客服：</view>
		<image class="body" :src="qrCode" @click="identify"></image>
		<view class="title">微信号：<text @longpress="copy">{{mobile}}</text></view>
		<view class="title">咨询及商业活动：<text @click="call">{{mobile}}</text></view>
	</view>
</template>

<script>
	import {customerService} from "@/api";

    export default {
		data() {
			return {
				mobile:'',
                qrCode: ''
			}
		},
        onShow(){
            customerService({},'get').then(res=>{
                let {qrCode,phoneNumber} = res
                this.qrCode = qrCode
                this.mobile = phoneNumber
            })
        },
		methods: {
			call(){
				uni.makePhoneCall({
				    phoneNumber: this.mobile //仅为示例
				});
			},
			copy() {
				wx.setClipboardData({
					data: this.mobile,
					success: function (res) {
						uni.showToast({
							title:'复制成功'
						})
					}

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
			}
		}
	}
</script>

<style lang="less">
	page{
		background: #f6f6f6;
	}
	.customer {
		width: 100%;

		.time {
			width: 100%;
			height: 60rpx;
			font-size: 30rpx;
			line-height: 60rpx;
			text-align: center;
			color: #999999;
		}
		.title {
			font-size: 34rpx;
			padding: 20rpx 0;
			color: #000000;

			text{
				color: #00aaff;
				border-bottom: 1px #00aaff solid;
			}
		}
		.body {
			width:750rpx;
            height: 750rpx;
		}
	}
</style>
