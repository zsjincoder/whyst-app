<template>
	<view class="platform">
		<view v-for="i in 8" 
		:key="i"
		class="platform-item" @click="toPage">
			<view class="title-info">
				<view class="title">标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</view>
				<view class="time">2020-05-01 11:33:52</view>
			</view>
			<image class="look-more" src="../../static/images/look-more.png" mode=""></image>
		</view>
		<tui-loadmore :index="3" type="orange"></tui-loadmore>
		<tui-nomore :backgroundColor="'#f6f6f6'"></tui-nomore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toPage(){
				uni.navigateTo({
					url:'/pages/announcementDetails/announcementDetails'
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #f6f6f6;
	}
	
	.platform {
		display: inline-block;
		width: 100%;
		height: 100%;
		.platform-item {
			margin-top: 10rpx;
			width: 100%;
			height: 150rpx;
			box-sizing: border-box;
			padding: 0 30rpx;
			background: #FFFFFF;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			.title-info {
				.title{
					width: 600rpx;
					height: 50rpx;
					font-size: 36rpx;
					margin-bottom: 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.time{
					font-size: 28rpx;
					color: #999999;
				}
			}
			
			.look-more {
				width: 50rpx;
				height: 50rpx;
			}
		}
	}

</style>
