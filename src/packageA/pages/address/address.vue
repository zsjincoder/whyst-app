<template>
	<view class="tui-safe-area">
		<view class="tui-address">
			<block v-for="(item,index) in addressList" :key="index">
				<tui-list-cell padding="0" @click="choseAddress(item.id)">
					<view class="tui-address-flex">
						<view class="tui-address-left">
							<view class="tui-address-main">
								<view class="tui-address-name tui-ellipsis">{{item.name}}</view>
								<view class="tui-address-tel">{{formatPhone(item.phone)}}</view>
							</view>
							<view class="tui-address-detail">
								<view class="tui-address-label" v-if="index===0">默认</view>
								<text>{{item.address}}</text>
							</view>
						</view>
						<view class="tui-address-imgbox">
							<image class="tui-address-img"
                                   src="/static/images/icon_addr_edit.png"
                                   @click="editAddr(item.id)"/>
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
		<!-- 新增地址 -->
		<view class="tui-address-new">
			<tui-button shadow shape="circle" type="danger" height="88rpx" @click="editAddr(false)">+ 新增收货地址</tui-button>
		</view>
	</view>
</template>

<script>
	import {shippingAddress} from "@/api";
	import {formatPhone} from "@/libs/utils";
	import {mapMutations} from "vuex";

	export default {
		data() {
			return {
				addressList: [],
				isChoose: false
			}
		},
		onLoad: function(options) {
			this.isChoose = options.isChoose === '1'
		},
		onShow() {
			this.getAddress()
		},
		methods: {
			...mapMutations({
				setAddressId:'setAddressId'
			}),

			formatPhone:formatPhone,
			choseAddress(id){
				if(this.isChoose){
					this.setAddressId(id)
					uni.navigateBack({
						delta:1
					})
				}
			},
			getAddress(){
				shippingAddress({},'get').then(res=>{
					this.addressList = res
				})
			},
			editAddr(id) {
				uni.navigateTo({
					url: "../editAddress/editAddress"+ `${id ? `?id=${id}` : ''}`
				})
			}
		}
	}
</script>

<style lang="less">
	.tui-address {
		width: 100%;
		padding-top: 20rpx;
		padding-bottom: 160rpx;
	}
	.tui-address-flex {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-address-main {
		width: 600rpx;
		height: 70rpx;
		display: flex;
		font-size: 30rpx;
		line-height: 86rpx;
		padding-left: 30rpx;
	}

	.tui-address-name {
		width: 120rpx;
		height: 60rpx;
	}

	.tui-address-tel {
		margin-left: 10rpx;
	}

	.tui-address-detail {
		font-size: 24rpx;
		word-break: break-all;
		padding-bottom: 25rpx;
		padding-left: 25rpx;
		padding-right: 120rpx;
	}

	.tui-address-label {
		padding: 5rpx 8rpx;
		flex-shrink: 0;
		background: #e41f19;
		border-radius: 6rpx;
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		line-height: 25rpx;
		transform: scale(0.8);
		transform-origin: center center;
		margin-right: 6rpx;
	}

	.tui-address-imgbox {
		width: 80rpx;
		height: 100rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		right: 10rpx;
	}

	.tui-address-img {
		width: 36rpx;
		height: 36rpx;
	}

	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 25rpx 30rpx;
		box-sizing: border-box;
		background: #fafafa;
	}

	.tui-safe-area {
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
