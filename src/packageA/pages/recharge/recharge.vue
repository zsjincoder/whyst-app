<template>
	<view>
		<tui-list-view unlined="all">
			<tui-list-cell :lineLeft="false" :padding="'39rpx 30rpx 39rpx 30rpx'" :unlined="true" :hover="false" :arrow="true">
				<view class="tui-item-box">
					<view class="tui-msg-name">充值方式</view>
					<view class="tui-msg-name tui-msg-name3">微信</view>
				</view>
			</tui-list-cell>
		</tui-list-view>
		<!-- 提现框 -->
		<view class="w_cash_box">
			<view class="w_c_b_hint">充值金额</view>
			<view class="w_c_flex" style="justify-content: space-between;">
				<view class="w_c_flex">
					<view class="w_c_flag">￥</view>
					<input class="w_c_flag w_c_input" type="digit" v-model="money"  />
				</view>
				<tui-icon @click="deleteAll" v-if="money !== 0&&money !== ''" :name="'close-fill'" :size="32" :unit="'rpx'" :color="'#A9A9A9'"></tui-icon>
			</view>
			<view class="mini_divider" style="margin-top: 41rpx;"></view>
			<view class="w_all">本次最多可充值￥10000</view>
		</view>
		<!-- 提交按钮 -->
		<view class="r_send">
			<view class="r_s_button" :style="{background:money === 0?'#8198dd':'#334dcd',disable: loading}" @click="rechargeMoney">充值</view>
		</view>
	</view>
</template>

<script>
	import {recharge} from "@/api";

	export default {
		data() {
			return {
				loading: false,
				money:0,
			}
		},
		methods: {
			//充值
			rechargeMoney(){
				let m = Number(this.money)
				if (m <= 0 || m > 10000){
					uni.showModal({
						title: '提示',
						content: '请输入0~10000金额',
						duration: 2000
					})
					return false
				}
				this.loading = true;
				recharge({money:Number(this.money)},'post').then(res=>{
					console.log(res);
					let {timeStamp,nonceStr,signType,paySign} = res;
					wx.requestPayment({
						timeStamp:res.timeStamp.toString(),
						nonceStr,
						package: res.package,
						signType,
						paySign,
						success (res) {
							console.log(res);
							this.loading = false
							uni.navigateBack({delta:1})
						},
						fail (res) {
							console.log(res);
						}
					})
				})
			},
			deleteAll(){
				this.money = 0;
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F6F6F6;
	}
	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-msg-name {
		font-size: 30rpx;
		color: rgba(102, 102, 102, 1);
	}

	.tui-msg-name3 {
		font-weight:bold;
		color:rgba(48,48,48,1);
		margin-right: 30rpx;
	}
	.w_cash_box{
		margin-top: 2rpx;
		width: 100%;
		background: #FFFFFF;
		padding: 30rpx;
		box-sizing: border-box;
		.w_c_flex{
			display: flex;
			align-items: center;
		}
		.w_c_flag{
			font-size:42rpx;
			font-weight:bold;
			color:rgba(48,48,48,1);
			margin-right: 25rpx;
		}
		.w_c_input{
			width: 500rpx;
			height: 88rpx;
		}
		.w_c_b_hint{
			font-size:30rpx;
			color:rgba(102,102,102,1);
			margin-bottom: 57rpx;
		}
		.w_all{
			margin-top: 38rpx;
			font-size:24rpx;
			font-weight:bold;
			color:rgba(153,153,153,1);
			text{
				color: #3483CC;
			}
		}
	}
	.r_send {
		padding: 0 35rpx;
		box-sizing: border-box;
		margin-top: 73rpx;

		.r_s_button {
			height: 82rpx;
			// background: rgba(51, 205, 161, 1);
			border-radius: 10rpx;
			line-height: 82rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
