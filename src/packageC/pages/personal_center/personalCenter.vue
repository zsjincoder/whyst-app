<template>
	<view>
		<!-- 头像 -->
		<view class="i_space">
			<tui-list-view unlined="all">
				<tui-list-cell :unlined="true" :lineLeft="false" :hover="false">
					<view class="tui-item-box">
						<view class="tui-msg-name">头像</view>
						<image :src="userInfo.headimgUrl || ''" class="tui-msg-pic" mode="widthFix"></image>
					</view>
				</tui-list-cell>
				<tui-list-cell :unlined="true" :lineLeft="false" :hover="false">
					<view class="tui-item-box">
						<view class="tui-msg-name">昵称</view>
						<view class="tui-msg-name2">{{userInfo.nickname || ''}}</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		<!-- 个人信息1 -->
		<view class="i_space">
			<tui-list-view unlined="all">

				<tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'"
							   @click="setName(userInfo.realName)"
				 :arrow="true">
					<view class="tui-item-box">
						<view class="tui-msg-name">真实姓名</view>
						<view class="tui-msg-name2">{{userInfo.realName || '请填写'}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :unlined="true" :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'" :arrow="true">
					<view class="tui-item-box">
						<view class="tui-msg-name">性别</view>
						<view class="tui-msg-name2">{{userInfo.sex === 1 ? '男' :'女'}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'" :arrow="true"
				@click="getPhone()">
					<view class="tui-item-box">
						<view class="tui-msg-name">联系电话</view>
						<view class="tui-msg-name2">{{userInfo.phone || '请填写'}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'" @click="toPage('/packageC/pages/personal_center/collectionCode/collectionCode')"
							   :arrow="true">
					<view class="tui-item-box">
						<view class="tui-msg-name">收款码</view>
						<view class="tui-msg-name2">{{qrMsg}}</view>
					</view>
				</tui-list-cell>
				<tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'" :arrow="true" @click="toPage('/packageA/pages/address/address')">
					<view class="tui-item-box">
						<view class="tui-msg-name">收货地址</view>
						<view class="tui-msg-name2"></view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		<tui-modal :show="show" @cancel="show = false" :custom="true">
			<view class="phone">
				<image src="/static/fail.png" class="tui-tips-img"></image>
				<view class="title">请允许获取手机号</view>
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号码权限</button>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import {mapGetters} from "vuex";
	import {decrypt} from "@/api";

	export default {
		data() {
			return {
				show:false,
				popupShow: false,
			}
		},
		computed:{
			...mapGetters({
				userInfo:'getUserInfo'
			}),
			qrMsg(){
				let images = this.userInfo.withdrawQrCode.split(',');
				let index = 0
				images.forEach(item=>{
					item && index ++
				})
				if (index === 0){
					return '请上传付款码'
				}else if (index === 1){
					if (images[0] !== ''){
						return '微信二维码'
					}else {
						return '支付宝二维码'
					}
				}else {
					return '微信、支付宝二维码'
				}
			}
		},
		methods: {
			// 选择性别
			pickerSex(e) {
				console.log(e);
				this.sexIndex = Number(e.detail.value);
				this.sex = this.array[this.sexIndex].name;
			},
			//页面跳转
			toPage(url) {
				uni.navigateTo({
					url
				})
			},
			//设置姓名
			setName(name){
				if (name){
					uni.showToast({
						title:'真实姓名只可设置一次！',
						duration: 2000,
						icon: 'none'
					})
				}else {
					this.toPage('/packageC/pages/personal_center/setNickname/setNickname')
				}
			},
			//获取手机号码
			getPhone(){
				if (this.userInfo.phone === ''){
					this.show = true
				}
			},
			//获取手机号码
			getPhoneNumber(e){
				let encryptedData = e.detail.encryptedData
				let iv = e.detail.iv
				decrypt({encryptedData, iv},'post').then(res=>{
					this.$store.commit('setUserInfoPhone', res.phoneNumber)
					this.show = false
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}

	.i_space {
		padding-top: 23rpx;
		box-sizing: border-box;
	}

	.tui-item-box {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		line-height: 1;
		font-size: 30rpx;
		color: rgba(33, 33, 33, 1);
	}

	.tui-msg-name2 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 30rpx;
		font-weight: bold;
		max-width: 65%;
		color: rgba(33, 33, 33, 1);
		margin-right: 44rpx;
	}

	.tui-msg-name3 {
		color: #999999;
	}


	.tui-msg-pic {
		width: 70rpx;
		height: 70rpx;
		border-radius: 10rpx;
		display: block;
		margin-right: 44rpx;
		flex-shrink: 0;
	}

	.array_item {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 30rpx;
		color: rgba(47, 47, 47, 1);
		background: #FFFFFF;
		margin-bottom: 2rpx;

		&:active {
			color: #33CDA1;
		}
	}

	.cancel {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		font-size: 30rpx;
		color: rgba(47, 47, 47, 1);
		background: #FFFFFF;
		margin-top: 44rpx;
	}
</style>
