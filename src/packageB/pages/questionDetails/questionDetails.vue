<template>
	<view>
		<view class="mini_divider"></view>
		<view class="q_detail">
			<view class="q_title">Q：{{listItem.question}}</view>
			<view class="q_content">A：<text>{{listItem.answer}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listItem: null
			}
		},
        onLoad: function (option) {
            const item = JSON.parse(decodeURIComponent(option.item));
            this.listItem = item
        },
		methods: {

		}
	}
</script>

<style lang="scss">
	page{
		background: #FFFFFF;
	}
	.q_detail{
		padding: 43rpx 34rpx;
		box-sizing: border-box;
	}
	.q_title{
		font-size:32rpx;
		font-weight:bold;
		color:rgba(33,33,33,1);
	}
	.q_content{
		font-size:28rpx;
		color:rgba(33,33,33,1);
		margin-top: 53rpx;
	}
</style>
