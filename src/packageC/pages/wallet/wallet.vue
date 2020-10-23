<template>
	<view>
		<view class="w_balance">
			<view class="w_b_title">全部收益</view>
			<view class="w_b_money">{{integral || 0}} <span style="font-size:36rpx">（积分）</span> </view>
		</view>
		<tui-list-view unlined="all">
			<tui-list-cell :lineLeft="false" @click="toRecords('/packageA/pages/recharge/recharge')" :padding="'39rpx 26rpx 39rpx 26rpx'" :arrow="true">
				<view class="tui-item-box">
					<image class="tui-msg-icon" src="/static/wallet-icon/充值.png"></image>
					<view class="tui-msg-name">充值</view>
				</view>
			</tui-list-cell>
			<tui-list-cell :lineLeft="false" @click="toRecords('/packageA/pages/withdraw/withdraw')" :padding="'39rpx 26rpx 39rpx 26rpx'" :unlined="true" :arrow="true">
				<view class="tui-item-box">
					<image class="tui-msg-icon" src="/static/wallet-icon/提现.png"></image>
					<view class="tui-msg-name">提现</view>
				</view>
			</tui-list-cell>
		</tui-list-view>
		<view class="i_space">
			<tui-list-view unlined="all">
				<tui-list-cell :lineLeft="false" @click="toRecords('/packageA/pages/incomeBreakdown/incomeBreakdown')" :padding="'39rpx 26rpx 39rpx 26rpx'" :unlined="true" :arrow="true">
					<view class="tui-item-box">
						<image class="tui-msg-icon" src="/static/wallet-icon/收支明细.png"></image>
						<view class="tui-msg-name">明细</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
	</view>
</template>

<script>
	import {Integral} from "@/api";

	export default {
		data() {
			return {
				//用户积分
				integral: 0,
			}
		},
		onShow(){
			Integral({},'get').then(res=>{
				this.integral = res.integral;
			})
		},
		methods: {
            toRecords(url) {
                uni.navigateTo({
                    url
                })
            }
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}

	.i_space {
		margin-top: 12rpx;
	}

	.w_balance {
		width: 100%;
		min-height: 226rpx;
		background: linear-gradient(146deg, rgb(39, 87, 231), rgb(118, 199, 253));
		padding: 58rpx 30rpx 59rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.w_b_title {
			font-size:32rpx;
			color: rgba(255, 255, 255, 1);
			opacity: 0.6;
		}

		.w_b_money {
			margin-top: 25rpx;
			font-size: 60rpx;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
		}
	}

	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
		// justify-content: space-between;
	}

	.tui-msg-name {
		font-size: 30rpx;
		font-weight: bold;
		color: rgba(48, 48, 48, 1);
		margin-left: 31rpx;

	}

	.tui-msg-icon {
		width: 48rpx;
		height: 48rpx;
		// margin-left:23rpx;
	}
</style>
