<template>
	<view class="platform">
		<view v-for="(item,index) in announcementList"
		:key="index"
		class="platform-item" @click="toPage(item.id)">
			<view class="title-info">
				<view class="title">{{item.title}}</view>
				<view class="time">{{item.createTime}}</view>
			</view>
			<image class="look-more" src="../../static/images/look-more.png" mode=""></image>
		</view>
		<tui-nomore :backgroundColor="'#f6f6f6'"></tui-nomore>
	</view>
</template>

<script>
	import {notice} from "@/api";

	export default {
		data() {
			return {
				announcementList: [],
				pageData: {
					page: 1,
					limit: 10,
					total: 0
				}
			}
		},
		onShow(){
			this.announcementList = [];
			this.pageData.page = 1;
			this.getAnnouncement()
		},
		onReachBottom(){
			this.pageData.page ++;
			this.getAnnouncement();
			console.log('底部了');
		},
		methods: {
			//获取公告
			getAnnouncement(){
				notice(this.pageData, 'get').then(res=>{
					let {list , total} = res;
					this.pageData.total = total;
					this.needToLoadMore(this.announcementList,this.pageData, list)
				})
			},
			toPage(id){
				uni.navigateTo({
					url:'/packageB/pages/announcementDetails/announcementDetails?id='+id
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
					font-size: 32rpx;
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
