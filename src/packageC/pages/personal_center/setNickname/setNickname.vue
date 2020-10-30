<template>
	<view style="width: 100%;display: inline-block;">
		<!-- 输入框 -->
		<view class="s_n_flex s_n_box">
			<input class="s_input" :maxlength="20" v-model.lazy.trim="name" placeholder="请输入真实姓名"/>
			<view class="s_n_flex">
				<view class="s_n_number">{{nameLength}}/20</view>
				<tui-icon @click="deleteAll" v-if="nameLength !== 0" :name="'close-fill'" :size="32" :unit="'rpx'" :color="'#A9A9A9'"></tui-icon>
			</view>
		</view>
		<view class="r_send">
			<view class="r_s_button"
				  :style="{background:nameLength === 0?'#8198dd':'#334dcd'}"
				  @click="setName">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	import {editInfo} from "@/api";

	export default {
		data() {
			return {
				name: "",
			}
		},
		computed:{
			nameLength(){
				return this.name.length
			}
		},
		methods: {
			deleteAll() {
				this.name = "";
			},
			setName(){
				editInfo({realName:this.name},'put').then(res=>{
					this.$store.commit('setUserInfoName', this.name)
					uni.showToast({
						title:'设置成功',
						duration:2000
					})
					setTimeout(()=>{
						uni.navigateBack({delta:1})
					},2000)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F6F6F6;
	}

	.s_n_flex {
		display: flex;
		align-items: center;
	}

	.s_n_box {
		width: 100%;
		height: 88rpx;
		padding-right: 30rpx;
		box-sizing: border-box;
		justify-content: space-between;
		background: #FFFFFF;
		margin-top: 23rpx;
	}

	.s_input {
		width: 550rpx;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 28rpx;
		color: rgba(48, 48, 48, 1);
		padding-left: 30rpx;
	}

	.s_n_number {
		font-size: 28rpx;
		color: #333333;
		margin-right: 30rpx;
	}

	.r_send {
		padding: 0 35rpx;
		box-sizing: border-box;
		margin-top: 96rpx;

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
