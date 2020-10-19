<template>
	<view>
		<view class="question_list">
<!--			<view class="q_item" v-for="(item,index) in questionList" :key="index" @click="toPage(item)">-->
<!--				<view class="q_title">Q：{{item.question}}</view>-->
<!--				<view class="q_content">A：{{item.answer}}</view>-->
<!--			</view>-->
            <list-loading></list-loading>
            <tui-nomore :backgroundColor="'#f6f6f6'"></tui-nomore>
		</view>
	</view>
</template>

<script>
	import {question} from "@/api";

    export default {
		data() {
			return {
			    loadingType: 1,
				questionList: [],
                pageData: {
				    page: 1,
                    limit: 10,
                    total: 0
                }
			}
		},
        onLoad(){
            this.getQuestion()
        },
        onReachBottom(){
		    this.pageData.page ++;
		    // this.getQuestion();
            this.loadingType = 1
            console.log('底部了');
        },
		methods: {
		    // 获取答疑列表
            getQuestion(){
                this.loadingType = 2
                question(this.pageData, 'get').then(res=>{
                    this.questionList = res.list
                })
            },
			toPage(item){
                    uni.navigateTo({
					url:'/pages/questionDetails/questionDetails?item='+ encodeURIComponent(JSON.stringify(item))
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
		width: 100%;
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
        overflow: hidden;
        height:36rpx;
        text-overflow: ellipsis;
        white-space: nowrap;
	}
</style>
