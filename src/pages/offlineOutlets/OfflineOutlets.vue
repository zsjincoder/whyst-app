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
        <view class="shop-info">
            <view class="name">
                <text>{{ shopInfo.name }}</text>
            </view>
            <view class="phone">
                <text>联系电话：<text>{{shopInfo.phone}}</text></text>
            </view>
            <view class="address">
                地址：{{shopInfo.address}}
            </view>
        </view>
    </view>
</template>

<script>

export default {
    name: "OfflineOutlets",
    data() {
        return {
            //搜索值
            searchText:'',
            mapConfig: {
                //106.517488,29.544261
                id: 0, // 使用 marker点击事件 需要填写id
                title: 'map',
                latitude: 29.547702,
                longitude: 106.516967,
                covers: [{
                    id: 1,
                    latitude: 29.545227,
                    longitude: 106.513958,
                    iconPath: '/static/logo.png',
                    callout: {
                        content: `恒大都市广场`,
                        display: 'ALWAYS'
                    }
                }, {
                    id: 2,
                    latitude: 29.544261,
                    longitude: 106.517488,
                    iconPath: '/static/logo.png',
                    callout: {
                        content: '恒大都市广场',
                        display: 'ALWAYS'
                    }
                }]
            },
            shopInfo: {
                name: '八戒猪肉店',
                phone: 13452645658,
                address: '重庆南岸区南山上头养猪场'
            }
        }
    },
    methods: {
        searchTextChange(txt){
            console.log(txt);
        },
        markerTap(e){
            console.log(e);
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
        height: 350rpx;
        justify-content: center;
        align-items: center;
        background: #FFFFFF;
        padding: 10rpx 20rpx;
        font-size: 36rpx;
        color: #999;

        .name {
           
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