<template>
  <view>
    <!-- 头像 -->
    <view class="i_space">
      <tui-list-view unlined="all">
        <tui-list-cell :unlined="true" :lineLeft="false" :hover="false">
          <view class="tui-item-box">
            <view class="tui-msg-name">头像</view>
            <image src="/static/images/news/4.jpg" class="tui-msg-pic" mode="widthFix"></image>
          </view>
        </tui-list-cell>
        <tui-list-cell :unlined="true" :lineLeft="false" :hover="false">
          <view class="tui-item-box">
            <view class="tui-msg-name">昵称</view>
            <view class="tui-msg-name2">吃藕</view>
          </view>
        </tui-list-cell>
      </tui-list-view>
    </view>
    <!-- 个人信息1 -->
    <view class="i_space">
      <tui-list-view unlined="all">

        <tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'"  :arrow="true">
          <view class="tui-item-box">
            <view class="tui-msg-name">真实姓名</view>
            <view class="tui-msg-name2">张颖</view>
          </view>
        </tui-list-cell>
        <tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'"  :arrow="true">
          <view class="tui-item-box">
            <view class="tui-msg-name">收款码</view>
          </view>
        </tui-list-cell>
        <tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'" :arrow="true">
          <picker @change="pickerSex" :value="sexIndex"  :range-key="'name'" :range="array">
            <!-- 						<view class="random-button">
                          <view class="r_title">心事分类</view>
                          <view class="tui-right">{{array[index]}}</view>
                        </view> -->
            <view class="tui-item-box">
              <view class="tui-msg-name">性别</view>
              <view class="tui-msg-name2 tui-msg-name3">{{sex}}</view>
            </view>
          </picker>
        </tui-list-cell>
        <tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'"  :arrow="true">
          <view class="tui-item-box">
            <view class="tui-msg-name">联系电话</view>
            <view class="tui-msg-name2">18323398512</view>
          </view>
        </tui-list-cell>
        <tui-list-cell :lineLeft="false" :padding="'39rpx 26rpx 39rpx 26rpx'"  :arrow="true">
          <view class="tui-item-box">
            <view class="tui-msg-name">收货地址</view>
            <view class="tui-msg-name2">重庆市北碚区</view>
          </view>
        </tui-list-cell>
      </tui-list-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      popupShow:false,
      date: "未选择",
      sex:"未选择",
      sexIndex:0,
      array:[
        {
          id:0,
          name:"男"
        },
        {
          id:1,
          name:"女"
        }
      ]
    }
  },
  methods: {
    // 选择性别
    pickerSex(e){
      console.log(e);
      this.sexIndex = Number(e.detail.value);
      this.sex = this.array[this.sexIndex].name;
    }

  }
}
</script>

<style lang="scss">
page {
  background: #F6F6F6;
}

.i_space {
  padding-top: 23rpx;
  box-sizing: border-box;
}

.tui-item-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tui-msg-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
  font-size: 30rpx;
  color: rgba(33, 33, 33, 1);
}

.tui-msg-name2 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 30rpx;
  font-weight: bold;
  color: rgba(33, 33, 33, 1);
  margin-right: 44rpx;
}

.tui-msg-name3 {
  color: #999999;
}


.tui-msg-pic {
  width: 70rpx;
  height: 70rpx;
  border-radius: 10rpx;
  display: block;
  margin-right: 44rpx;
  flex-shrink: 0;
}
.array_item{
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size:30rpx;
  color:rgba(47,47,47,1);
  background: #FFFFFF;
  margin-bottom: 2rpx;
  &:active{
    color:#33CDA1;
  }
}
.cancel{
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size:30rpx;
  color:rgba(47,47,47,1);
  background: #FFFFFF;
  margin-top: 44rpx;
}

</style>
