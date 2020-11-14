<template>
	<view :style="{height:top+'rpx',paddingTop: '0rpx'}">
		<tui-sticky :scrollTop="scrollTop" :stickyTop="stickyTop" stickyHeight="110rpx" container>
			<template v-slot:header>
				<view class="mall-header" :style="{background: `url(${headerImg}) no-repeat`,backgroundSize: '100% 100%'}">
					<view class="input-con">
						<input v-model="search" class="header-input" confirm-type="search" placeholder-class="header-input-placeholder"
						 type="text" placeholder="商品名称">
						<view class="input-handler">
							<tui-icon v-show="search" name="close" color="#999" :size="30" unit="rpx" @click="search= '';searchList()"></tui-icon>
							<view>|</view>
							<tui-icon name="search" color="#999" :size="36" unit="rpx" @click="searchList"></tui-icon>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:content>
				<!--  轮播  -->
				<view class="swiper-box">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,key) in swiperList" :key="key" class="swiper-item">
							<image :src="item.img"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="tui-product-list">
					<view class="tui-product-container">
						<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 != 0">
							<!--商品列表-->
							<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item.id)">
								<image :src="item.stock[0].image" class="tui-pro-img" mode="widthFix" />
								<view class="tui-pro-content">
									<view class="tui-pro-tit">{{ item.name }}</view>
									<view>
										<view class="tui-pro-price">
											<text class="tui-sale-price">￥{{ item.lowPrice }}</text>
<!--											<text class="tui-factory-price">￥{{ item.lowPrice }}</text>-->
										</view>
										<view class="tui-pro-pay">{{ item.salesStatistics.allSales || 0 }}人付款</view>
									</view>
								</view>
							</view>
							<!--商品列表-->
							<!-- <template is="productItem" data="{{item,index:index}}" /> -->
						</block>
					</view>
					<view class="tui-product-container">
						<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 == 0">
							<!--商品列表-->
							<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item.id)">
								<image :src="item.stock[0].image" class="tui-pro-img" mode="widthFix" />
								<view class="tui-pro-content">
									<view class="tui-pro-tit">{{ item.name }}</view>
									<view>
										<view class="tui-pro-price">
											<text class="tui-sale-price">￥{{ item.lowPrice || 0}}</text>
<!--											<text class="tui-factory-price">￥{{ item.lowPrice || 0 }}</text>-->
										</view>
										<view class="tui-pro-pay">{{ item.salesStatistics.allSales || 0 }}人付款</view>
									</view>
								</view>
							</view>
							<!--商品列表-->
							<!-- <template is="productItem" data="{{item,index:index}}" /> -->
						</block>
					</view>
				</view>
				<!-- <tui-loadmore :index="3" type="orange"></tui-loadmore> -->
				<tui-nomore :backgroundColor="'#f6f6f6'"></tui-nomore>
			</template>
		</tui-sticky>
	</view>
</template>

<script>
import {banner, goods} from "@/api";

	export default {
		data() {
			return {
				//轮播参数
				autoplay: true,
				interval: 3600,
				duration: 500,
				indicatorDots: true,
				swiperList: [],

				scrollTop: 0,
				stickyTop: uni.upx2px(0),
				top: 0,

				headerImg: require('../../static/bg.png'),
				search: '',
				productList: [],
				pageData: {
					page: 1,
					limit: 10,
					total: 0
				}
			};
		},
		//页面滚动执行方式
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		onShow(){
			this.productList = [];
			this.pageData.page = 1;
			this.getGoodsList()
			this.getBannerInfo()
		},
		onReachBottom(){
			this.pageData.page ++;
			this.getGoodsList();
			console.log('底部了');
		},
		onLoad() {
			let obj = {};
			// #ifdef MP-WEIXIN
			obj = wx.getMenuButtonBoundingClientRect();
			uni.getSystemInfo({
				success: (res) => {
					this.top = res.statusBarHeight * 2;
				}
			})
			// #endif
		},
		methods: {
            //banner图
            getBannerInfo() {
                banner({}, 'get').then(res=>{
                    this.swiperList = res || []
                })
            },
			//获取商品列表
			getGoodsList(){
				let param = {}
				param = Object.assign(param, this.pageData, {keyWord: this.search})
				goods(param, 'get').then(res=>{
					let {list , total} = res;
					this.pageData.total = total;
					this.needToLoadMore(this.productList,this.pageData, list)
				})
			},
			searchList() {
				this.productList = []
				this.pageData.page = 1
				this.getGoodsList()
			},
			detail(id = '') {
				uni.navigateTo({
					url: "/packageA/pages/productDetail/ProductDetail?id=" + id
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f6f6f6;
	}

	.mall-header {
		width: 100%;
		height: 110rpx;
		background-color: pink;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		.input-con {
			position: relative;

			.header-input {
				width: 450rpx;
				height: 60rpx;
				line-height: 40rpx;
				margin-right: 30rpx;
				font-size: 28rpx;
				color: #969696;
				background: rgba(255, 255, 255, 0.5);
				border-radius: 30rpx;
				box-sizing: border-box;
				padding-left: 30rpx;
				padding-right: 100rpx;
				text-align: center;
			}

			.input-handler {
				width: 100rpx;
				height: 100%;
				position: absolute;
				display: flex;
				justify-content: space-around;
				align-items: center;
				color: #999;
				top: 0rpx;
				right: 50rpx;
				z-index: 999;
			}

			.header-input-placeholder {
				color: #c5c5c5;
			}
		}

	}

	//轮播
	.swiper-box {
		width: 100%;
		padding: 0;
		margin-bottom: 20rpx;

		.swiper {
			width: 750rpx;
			height: 300rpx;

			.swiper-item {
				width: 100%;
				height: 100%;
			}

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		/* padding-top: 20rpx; */
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-price {
		padding-top: 18rpx;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>
