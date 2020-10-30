<template>
	<view class="rank-list">
		<image class="rank-img" src="/static/phb.png"></image>
		<tui-tabs :tabs="navBar" :currentTab="currentTab>1?0:currentTab" @change="change" itemWidth="50%"></tui-tabs>
		<view class="user-list">
			<view class="user-item" v-for="(item,i) in rankList" :key="i">
				<view class="info">
					<image v-if="i === 0" src="/static/rank/jinjiang.png" class="user-rank" mode="widthFix"></image>
					<image v-else-if="i === 1" src="/static/rank/yinjiang.png" class="user-rank" mode="widthFix"></image>
					<image v-else-if="i === 2" src="/static/rank/tongjiang.png" class="user-rank" mode="widthFix"></image>
					<i v-else class="rank">{{i}}</i>
					<image :src="item.headimgUrl" class="user-img" mode="aspectFill"></image>
					<view class="name">{{item.nickname}}</view>
				</view>
				<view class="money">
					<view class="money-body">
						<tui-icon name="coupon" color="#ff8800" :size="30" unit="rpx" @tap="search = ''"></tui-icon>
						<text>{{item.income}}</text>
					</view>
				</view>
			</view>
			<!-- <tui-loadmore :index="3" type="orange"></tui-loadmore> -->
			<!-- <load-more :loading="loading"></load-more> -->
		</view>
	</view>
</template>

<script>
	import LoadMore from "@/components/load_more/LoadMore";
	import {leaderboard} from "@/api";
	export default {
		components: {LoadMore},
		data() {
			return {
				loading:"loadmore",
				navBar: [{
					name: "周榜",
					value:'week'
				}, {
					name: "月榜",
					value:'month'
				}],
				currentTab:0,
				rankList:[]
			};
		},
		onShow(){
			this.getRank()
		},
		methods:{
			//排行榜
			getRank(){
				leaderboard(this.navBar[this.currentTab].value).then(res=>{
					this.rankList = res;
				})
			},
			change(e) {
				this.currentTab = e.index
				this.rankList = []
				this.getRank()
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #F6F6F6;
	}

	.rank-list {
		width: 750rpx;

		.rank-img {
			width: 750rpx;
			height: 350rpx;
		}
		.user-list {
			width: 750rpx;

			.user-item {
				display: flex;
				box-sizing: border-box;
				padding: 0 30rpx;
				width: 100%;
				height: 130rpx;
				border-bottom: 1px #CCCCCC solid;
				background-color: #FFFFFF;

				.info {
					display: flex;
					align-items: center;
					width: 70%;
					height: 100%;

					.user-rank {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.rank {
						width: 70rpx;
						text-align: center;
						font-size: 36rpx;
						color: #666666;
						font-weight: bold;
					}

					.user-img {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.name{
						margin-left: 15rpx;
						color: #6b6b6b;
					}
				}

				.money {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					height: 100%;

					.money-body {
						display: flex;
						min-width: 160rpx;
						height: 60rpx;
						border-radius: 30rpx;
						background-color: #ffe6bb;
						justify-content: space-around;
						align-items: center;
						color: #ff8800;
						box-sizing: border-box;
						padding: 15rpx;
					}
				}
			}
		}
	}
</style>
