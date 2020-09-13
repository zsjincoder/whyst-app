<template>
	<view class="rank-list">
		<image class="rank-img" src="../../static/phb.png"></image>
		<tui-tabs :tabs="navbar" :currentTab="currentTab>1?0:currentTab" @change="change" itemWidth="50%"></tui-tabs>
		<view class="user-list">
			<view class="user-item" v-for="i in 15" :key="i">
				<view class="info">
					<image v-if="i === 1" src="/static/rank/jinjiang.png" class="user-rank" mode="widthFix"></image>
					<image v-else-if="i === 2" src="/static/rank/yinjiang.png" class="user-rank" mode="widthFix"></image>
					<image v-else-if="i === 3" src="/static/rank/tongjiang.png" class="user-rank" mode="widthFix"></image>
					<i v-else class="rank">{{i}}</i>
					<image src="/static/logo.png" class="user-img" mode="widthFix"></image>
					<view class="name">大威天龙</view>
				</view>
				<view class="money">
					<view class="money-body">
						<tui-icon name="coupon" color="#ff8800" :size="30" unit="rpx" @tap="search = ''"></tui-icon>
						<text>10000000</text>
					</view>
				</view>
			</view>
			<!-- <tui-loadmore :index="3" type="orange"></tui-loadmore> -->
			<tui-nomore :backgroundColor="'#fff'"></tui-nomore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navbar: [{
					name: "周榜"
				}, {
					name: "月榜"
				}],
				currentTab:0
			};
		},
		methods:{
			change(e) {
				this.currentTab = e.index
			},
		}
	}
</script>

<style lang="less">
	page {
		background-color: #FFFFFF;
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
					width: 30%;
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
