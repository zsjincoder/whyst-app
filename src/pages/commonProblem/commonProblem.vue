<template>
	<view>
		<view class="question_list">
			<view class="q_item" v-for="(item,index) in 3" :key="index" @click="toPage">
				<view class="q_title">Q：余额怎么提现？</view>
				<view class="q_content">A：点击余额，选择提现方式，输入金额提现输入金额...</view>
			</view>
			<tui-loadmore :index="3" type="orange"></tui-loadmore>
			<tui-nomore :backgroundColor="'#f6f6f6'"></tui-nomore>
		</view>
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
					url:'/pages/questionDetails/questionDetails'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F6F6F6;
	}
	.question_list{
		
	}
	.q_item{
		width:100%;
		background:rgba(255,255,255,1);
		padding: 30rpx;
		box-sizing: border-box;
		margin-bottom: 2rpx;
	}
	.q_title{
		font-size:28rpx;
		font-weight:bold;
		color:rgba(33,33,33,1);
	}
	.q_content{
		font-size:28rpx;
		color:rgba(33,33,33,1);
		margin-top: 22rpx;
	}
</style>
