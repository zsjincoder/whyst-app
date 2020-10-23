<template>
	<view>
		<tui-list-view unlined="all">
			<tui-list-cell :lineLeft="false" :padding="'39rpx 30rpx 39rpx 30rpx'" :unlined="true" :hover="false" :arrow="true">
				<view class="tui-item-box">
					<view class="tui-msg-name">提现方式</view>
					<view class="tui-msg-name tui-msg-name3">微信</view>
				</view>
			</tui-list-cell>
		</tui-list-view>
		<!-- 提现框 -->
		<view class="w_cash_box">
			<view class="w_c_b_hint">提现金额（收取0.1%服务费）</view>
			<view class="w_c_flex" style="justify-content: space-between;">
				<view class="w_c_flex">
					<view class="w_c_flag">￥</view>
					<input class="w_c_flag" type="digit" v-model="money"  />
				</view>
				<tui-icon @click="deleteAll" v-if="money !== 0&&money !== ''" :name="'close-fill'" :size="32" :unit="'rpx'" :color="'#A9A9A9'"></tui-icon>
			</view>
			<view class="mini_divider" style="margin-top: 41rpx;"></view>
			<view class="w_all">零钱余额￥{{integral}}，<text @click="money = integral">全部提现</text></view>
		</view>
		<!-- 提交按钮 -->
		<view class="r_send">
      		<view class="r_s_button" :style="{background:money == 0?'#8198dd':'#334dcd'}" @click="withdraw">提现</view>
		</view>
		<tui-modal :show="show" @cancel="show = false" :custom="true">
			<view class="phone">
				<image src="/static/fail.png" class="tui-tips-img"></image>
				<view class="title">请允许获取手机号</view>
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号码</button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import {Integral} from "@/api";
	import {mapGetters} from "vuex";

	export default {
		data() {
			return {
				show:false,
				money: 0,
				integral: 200,
			}
		},
		onShow(){
			Integral({},'get').then(res=>{
				// this.integral = res.integral;
			})
		},
		computed:{
			...mapGetters({
				userInfo:"getUserInfo"
			})
		},
		methods: {
			//获取手机号码
			getPhoneNumber(res){
				console.log(res);
				this.show = false
				let encrypdata = e.detail.encryptedData
				let ivdata = e.detail.iv
				this.$store.commit('setUserInfoPhone',1345264568)
			},
			//发送验证码
			SendCode(){

			},
			deleteAll(){
				this.money = 0;
			},
			//体现
			withdraw(){
				let m = Number(this.money)
				if (m <= 0 || m > this.integral){
					uni.showModal({
						title: '提示',
						content: `请输入0~${this.integral}金额`
					})
					return false
				}
				if (this.userInfo.phone){
					uni.showModal({
						title: '提示',
						content: `提现需向${this.userInfo.phone}发送短信验证码！`,
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}else {
					this.show = true
				}

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
		.w_c_b_hint{
			font-size:28rpx;
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

	.phone {
		width: 100%;
		height: 320rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100rpx;
			text-align: center;
		}

		image{
			width: 60rpx;
			height: 60rpx;
		}
		button{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 80rpx;
			background: #3483CC;
			border-radius: 40rpx;
			color: #ffffff;
			font-size: 28rpx;
		}
	}
</style>
