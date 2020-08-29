<template>
	<view>
		<view class="minxi_list">
			<view class="minxi_item min_flex" v-for="(item,index) in 10" :key="index">
				<view class="min_flex">
					<u-icon name="rmb-circle-fill" :size="44" :color="'#e8a013'"></u-icon>
					<view style="margin-left: 22rpx;">
						<view class="minx_title">余额提现</view>
						<view class="minxi_date">07-06 13:00</view>
					</view>
				</view>
				<view class="minxi_money">500</view>
			</view>
		</view>
        <load-more :loading="loading"></load-more>
	</view>
</template>

<script>
	import LoadMore from "@/components/load_more/LoadMore";
    export default {
        components: {LoadMore},
        data() {
			return {
        loading:'loadmore'
			}
		},
    onReachBottom() {
      // 上拉加载更多
      console.log(123);
    },
    onPullDownRefresh() {
        setTimeout(function (){
          uni.stopPullDownRefresh();
        },1000)
      // 下拉刷新
    },
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #F6F6F6;
	}
	.minxi_list{
		padding: 0 23rpx;
		box-sizing: border-box;
		margin-top: 17rpx;
	}
	.min_flex{
		display: flex;
	}
	.minxi_item{
		margin-bottom: 8rpx;
		width:100%;
		// height:132px;
		background:rgba(255,255,255,1);
		border-radius:10rpx;
		padding: 30rpx 34rpx;
		box-sizing: border-box;
		justify-content: space-between;
		align-items: center;
		.minx_title{
			font-size:28rpx;
			color:rgba(34,34,34,1);
		}
		.minxi_date{
			font-size:24rpx;
			color:rgba(153,153,153,1);
			margin-top: 24rpx;
		}
		.minxi_money{
			font-size:36rpx;
			font-weight:bold;
			color:rgba(34,34,34,1);
		}
	}
		
</style>
