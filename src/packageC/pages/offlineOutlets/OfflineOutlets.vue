<template>
    <view class="shop">
        <view class="map-search">
            <t-input placeholder="请输入要查询的门店"
                     @searchTextChange="searchTextChange"></t-input>
        </view>
        <map style="width: 100%; height: 300px;"
             :latitude="mapConfig.latitude"
             :longitude="mapConfig.longitude"
             :enable-traffic="true"
             :scale="16"
             :markers="mapConfig.covers"
             @markertap="markerTap"
             @callouttap="markerTap">
        </map>
        <view class="shop-info" v-if="mapConfig.covers.length > 0">
            <image :src="shopInfo.logo"></image>
            <view class="name">
                <text>{{ shopInfo.name || ''}}</text>
            </view>
            <view class="phone">
                <text>联系电话：<text>{{shopInfo.contactNumber || ''}}</text></text>
            </view>
            <view class="address">
                地址：{{shopInfo.address || ''}}
            </view>
        </view>
        <view class="shop-info" v-else>
            暂无数据
        </view>
    </view>
</template>

<script>
import TInput from "@/components/t-input/TInput";
import {getStore} from "@/api";
export default {
    name: "OfflineOutlets",
    components: {TInput},
    data() {
        return {
            //搜索值
            searchText:'',
            mapConfig: {
                //106.517488,29.544261
                id: 0, // 使用 marker点击事件 需要填写id
                title: 'map',
                "enable-3D": true,
                latitude: 29.547702,
                longitude: 106.516967,
                covers: []
            },
            shopInfo: {}
        }
    },
    onShow(){
      this.getOutlets()
    },
    methods: {
        getOutlets(name = ''){
            getStore({name},'get').then(res=>{
                let data = res;
                data.forEach(item=>{
                    item.iconPath = item.logo
                    item.width = 60
                    item.height = 50
                    item.iconPath = item.logo
                    item.callout = {
                        content: item.name,
                        display: 'ALWAYS'
                    }
                })
                if (data.length > 0){
                    let {latitude,longitude,name,contactNumber,address,logo} = data[0]
                    this.mapConfig.latitude = latitude
                    this.mapConfig.longitude = longitude
                    this.shopInfo ={name, contactNumber, address, logo}
                }
                this.mapConfig.covers = data
            })
        },
        searchTextChange(txt){
            this.getOutlets(txt)
        },
        markerTap(e){
            let id = e.detail.markerId
            let item = this.mapConfig.covers.find(item => item.id === id)
            if (item !== undefined){
                let {latitude,longitude,name,contactNumber,address,logo} = item
                this.mapConfig.latitude = latitude
                this.mapConfig.longitude = longitude
                this.shopInfo ={name, contactNumber, address, logo}
            }
        }
    }
}
</script>

<style scoped
       lang="less">
.shop {
    width: 100%;

    .map-search {
        display: flex;
        box-sizing: border-box;
        padding: 0 5%;
        position: relative;
        width: 100%;
        height: 100rpx;
        justify-content: center;
        align-items: center;
        background: #fff;

        .icon-search {
            position: absolute;
            margin: 0 auto;
            right: 20rpx;
            display: block;
        }

        .map-search-input {
            box-sizing: border-box;
            width: 100%;
            height: 70rpx;
            padding:0 60rpx 0 30rpx;
            border-radius: 20rpx;
            background: #fff;
        }
    }

    .shop-info {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        height: 450rpx;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        padding: 10rpx 20rpx;
        font-size: 28rpx;
        color: #999;

        image {
            width: 500rpx;
            height: 350rpx;
        }

        .phone {
            margin-top: 20rpx;
        }

        .address {
            display: flex;
            margin-top: 20rpx;
        }
    }
}

</style>
