<template>
	<view class="tui-addr-box">
		<form :report-submit="true" @submit="formSubmit">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input v-model="formData.name" placeholder-class="tui-phcolor" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="15" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input v-model="formData.phone" placeholder-class="tui-phcolor" class="tui-input" name="phone" placeholder="请输入收货人手机号码" maxlength="11"
					 type="number" />
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" padding="0"  @click="show = true">
				<view class="tui-line-cell">
					<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
					<input v-model="formData.cityName" placeholder-class="tui-phcolor" class="tui-input" disabled name="city" placeholder="请选择城市" maxlength="50" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货地址</view>
					<input v-model="formData.homeAddress" placeholder-class="tui-phcolor" class="tui-input" name="address" placeholder="请输入详细的收货地址" maxlength="50" type="text" />
				</view>
			</tui-list-cell>

			<!-- 默认地址 -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch :checked="formData.isDefault" color="#19be6b" class="tui-switch-small" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save" v-if="isAdd">
				<tui-button shadow
							type="danger"
							height="88rpx"
							shape="circle"
							formType="submit">保存收货地址</tui-button>
			</view>
			<view class="tui-del" v-else>
				<tui-button shadow
							type="danger"
							height="88rpx"
							shape="circle"
							formType="submit">修改收货地址</tui-button>
				<tui-button shadow
							type="gray"
							height="88rpx"
							shape="circle"
							margin="30rpx 0 0 0"
							@click="delAddress()">删除收货地址</tui-button>
			</view>
		</form>
		<u-picker
			mode="region"
			v-model="show"
			:defaultRegion="defaultRegion"
			:params="params"
			@confirm="confirm"
			@columnchange="columnchange"
		></u-picker>
	</view>
</template>

<script>
	import {shippingAddress} from "@/api";

	const form = require("@/components/thorui/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				//是否新增
				isAdd: true,
				formData:{
					name:'',
					phone:'',
					city:'',
					cityName:'',
					address:'',
					homeAddress:'',
					isDefault: true
				},

				defaultRegion: ['重庆市', '市辖区', '渝中区'],
				show: false,
				params: {
					province: true,
					city: true,
					area: true
				}
			}
		},
		onLoad(e){
			this.isAdd = !e.hasOwnProperty('id')
			if (this.isAdd){
				uni.setNavigationBarTitle({
					title: '新增地址'
				});
			}else {
				this.getAddressInfo(e.id)
				uni.setNavigationBarTitle({
					title: '修改地址'
				});
			}
		},
		methods: {
			//获取单个地址详情
			getAddressInfo(id){
				shippingAddress({id},'get').then(res=>{
					this.formData = res;
					this.formData.isDefault = this.formData.isDefault === 1;
					this.defaultRegion = this.formData.city ? JSON.parse(this.formData.city): []
					this.formData.cityName = this.defaultRegion.join(",").replace(/,/g,'-')
				})
			},
			confirm(e) {
				let {area,city,province} = e;
				this.formData.cityName = `${province.label}-${city.label}-${area.label}`
				this.defaultRegion = [province.label,city.label,area.label]
			},
			columnchange(e) {

			},
			formSubmit(e){
				let rules = [
					{
						name: "name",
						rule: ["required", "isChinese" ,"minLength:2", "maxLength:16"], //可使用区间，此处主要测试功能
						msg: ["请输入姓名", "收货人姓名必须为汉字" , "姓名必须2个或以上字符", "姓名不能超过16个字符"]
					},
					{
						name: "phone",
						rule: ["required", "isMobile"],
						msg: ["请输入手机号", "请输入正确的手机号"]
					},
					{
						name: "city",
						rule: ["required"],
						msg: ["请选择城市"]
					},
					{
						name: "address",
						rule: ["required"],
						msg: ["请输入详细地址"]
					},
				]
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if (!checkRes) {
					this.saveAddress()
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			},
			//新增保存地址
			saveAddress(){
				console.log(this.formData.isDefault);
				this.formData.city = JSON.stringify(this.defaultRegion)
				this.formData.address = this.formData.cityName + '-' + this.formData.homeAddress
				this.formData.isDefault = this.formData.isDefault ? 1 : 0
 				shippingAddress(this.formData,this.isAdd ? "post" : "put").then(res=>{
					if(!this.isAdd){
						uni.showToast({
							title: "修改地址成功!",
							icon: "success"
						});
					}else {
						uni.showToast({
							title: "新增地址成功!",
							icon: "success"
						});
					}

					setTimeout(()=>{
						uni.navigateBack({delta:1});
					},1500)
				})
			},
			//删除地址
			delAddress(){
				uni.showModal({
					title: "提示",
					content: '确认删除改地址么？',
					success:  (res)=> {
						if (res.confirm) {
							shippingAddress(this.formData.id,'delete').then(res=>{
								uni.showToast({
									title: "删除地址成功!",
									icon: "success"
								});
							})
							setTimeout(()=>{
								uni.navigateBack({delta:1});
							},1500)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}
	.tui-cell-title{
		font-size: 28rpx;
	}
	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}
	.tui-label-active{
		background: #E41F19;
		border-color:#E41F19;
		color: #fff;
	}
	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx;
	}
</style>
