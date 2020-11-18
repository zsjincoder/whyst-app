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
             :scale="mapConfig.scale"
             :markers="mapConfig.covers"
             @markertap="markerTap"
             @callouttap="markerTap">
        </map>
        <view class="shop-info" v-for="(item,i) in mapConfig.covers"
              :key="i">
            <image :src="item.logo"></image>
            <view class="name">
                <text>{{ item.name || ''}}</text>
            </view>
            <view class="phone"  @click="call(item.contactNumber)">
                <text>
                    联系电话：
                    <text
                        style="color: #00aaff">
                        {{item.contactNumber || ''}}
                    </text>
                </text>
            </view>
            <view class="address" @click="goHeir(item)">
                地址：<text
                    style="color: #4d8097">
                {{item.address || ''}}
            </text>
            </view>
        </view>
        <view class="shop-info" v-if="mapConfig.covers.length === 0">
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
                scale: 13,
                "enable-3D": true,
                latitude: 29.547702,
                longitude: 106.516967,
                covers: []
            },
            shopInfo: {}
        }
    },
    onLoad(){
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
                    this.mapConfig.scale = 13
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
                this.mapConfig.scale = 13
                this.shopInfo ={name, contactNumber, address, logo}
            }
        },
        //打电话
        call(phone){
            console.log(phone);
            if (phone){
                uni.makePhoneCall({
                    phoneNumber: phone
                });
            }
        },
        //qu
        goHeir(info){
            wx.openLocation({
                latitude: Number(info.latitude),
                longitude: Number(info.longitude),
                success: function () {
                    console.log('success');
                },
                fail: function (err) {
                    console.log(err);
                }
            });
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
        border-bottom: 1px silver solid;
        margin-top: 20rpx;

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
