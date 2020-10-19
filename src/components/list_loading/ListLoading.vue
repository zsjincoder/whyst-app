<template>
    <view class="loading-more">
        {{type}}
        <tui-loadmore :index="3"
                      type="orange"></tui-loadmore>
        <tui-nomore v-if="showNoMore"
                    :backgroundColor="'#f6f6f6'"></tui-nomore>
    </view>
</template>

<script>
export default {
    name: "ListLoading",
    props:{
        //加载更多：1，没有数据：2,还有更多数据：3
        type:{
            type: Number,
            default: -1
        }
    },
    watch:{
      type:{
          handler(newVal) {
              console.log(123232);
              switch (newVal){
                  case 1: this.showLoadMore = true; this.showNoMore = false; break;
                  case 2: this.showLoadMore = false; this.showNoMore = true; break;
                  default: this.showLoadMore = false;this.showNoMore = false;
              }
              console.log(this.showLoadMore);
              console.log(this.showNoMore);
          },
          deep: true,
          immediate: true
      }
    },
    data(){
        return{
            showLoadMore: false,
            showNoMore: false
        }
    }
    
}
</script>

<style scoped>
.loading-more{
    width: 100%;
    height: 200rpx;
    background: cyan;
}
</style>