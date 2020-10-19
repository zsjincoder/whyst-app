<template>
	<view :style="{height:top+'rpx',paddingTop: '0rpx'}">
		<tui-sticky :scrollTop="scrollTop" :stickyTop="stickyTop" stickyHeight="110rpx" container>
			<template v-slot:header>
				<view class="mall-header" :style="{background: `url(${headerImg}) no-repeat`,backgroundSize: '100% 100%'}">
					<view class="input-con">
						<input v-model="search" class="header-input" confirm-type="search" placeholder-class="header-input-placeholder"
						 type="text" placeholder="商品名称">
						<view class="input-handler">
							<tui-icon v-show="search" name="close" color="#999" :size="30" unit="rpx" @tap="search = ''"></tui-icon>
							<view>|</view>
							<tui-icon name="search" color="#999" :size="36" unit="rpx"></tui-icon>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:content>
				<!--  轮播  -->
				<view class="swiper-box">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(item,key) in swiperList" :key="key" class="swiper-item">
							<image :src="item"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="tui-product-list">
					<view class="tui-product-container">
						<block v-for="(item, index) in productList" :key="index" v-if="(index + 1) % 2 != 0">
							<!--商品列表-->
							<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail">
								<image src="/static/ewm.png" class="tui-pro-img" mode="widthFix" />
								<view class="tui-pro-content">
									<view class="tui-pro-tit">{{ item.name }}</view>
									<view>
										<view class="tui-pro-price">
											<text class="tui-sale-price">￥{{ item.sale }}</text>
											<text class="tui-factory-price">￥{{ item.factory }}</text>
										</view>
										<view class="tui-pro-pay">{{ item.payNum }}人付款</view>
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
							<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail">
								<image src="/static/ewm.png" class="tui-pro-img" mode="widthFix" />
								<view class="tui-pro-content">
									<view class="tui-pro-tit">{{ item.name }}</view>
									<view>
										<view class="tui-pro-price">
											<text class="tui-sale-price">￥{{ item.sale }}</text>
											<text class="tui-factory-price">￥{{ item.factory }}</text>
										</view>
										<view class="tui-pro-pay">{{ item.payNum }}人付款</view>
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
	export default {
		data() {
			return {
				//轮播参数
				autoplay: true,
				interval: 1800,
				duration: 500,
				indicatorDots: true,
				swiperList: [
					'/static/swiper/cw.jpg',
					'/static/swiper/xm.jpg',
				],

				scrollTop: 0,
				stickyTop: uni.upx2px(0),
				top: 0,

				headerImg: require('../../static/bg.png'),
				search: '',
				productList: [{
						img: 1,
						name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: '百雀羚套装女补水保湿护肤品',
						sale: 1599,
						factory: 2899,
						payNum: 236
					},
					{
						img: 5,
						name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
						sale: 599,
						factory: 899,
						payNum: 2399
					},
					{
						img: 6,
						name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
						sale: 599,
						factory: 899,
						payNum: 2399
					},
					{
						img: 1,
						name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜',
						sale: 599,
						factory: 899,
						payNum: 2342
					},
					{
						img: 2,
						name: '德国DMK进口牛奶',
						sale: 29,
						factory: 69,
						payNum: 999
					},
					{
						img: 3,
						name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
						sale: 299,
						factory: 699,
						payNum: 666
					},
					{
						img: 4,
						name: '百雀羚套装女补水保湿护肤品',
						sale: 1599,
						factory: 2899,
						payNum: 236
					}
				],
			};
		},
		//页面滚动执行方式
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
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
		onShow() {

		},
		methods: {
			//获取商品列表
			getGoodsList(){

			},
			detail() {
				uni.navigateTo({
					url: "/pages/productDetail/ProductDetail"
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
