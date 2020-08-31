<template>
    <view class="search-bar">
        <view class="search-bar-form">
            <view class="search-bar-box">
                <icon class="icon-search-in-box" type="search" :size="16"></icon>
                <input confirm-type="search"
                       class="search-bar-input"
                       :placeholder="placeholder"
                       :value="inputVal"
                       :focus="inputShowed"
                       @confirm="bindInput"
                       @input="inputTyping"/>
                <view v-if="inputVal"
                      class="icon-clear"
                      @tap="clearInput">
                    <icon type="clear"
                          size="14"></icon>
                </view>
            </view>
            <view v-show="!inputShowed"
                  class="search-bar-label"
                  @tap="showInput">
                <icon class="icon-search"
                      type="search"
                      :size="16"></icon>
                <view class="search-bar-text">{{ placeholder }}</view>
            </view>
        </view>
        <view v-show="inputShowed"
              class="cancel-btn"
              @tap="hideInput">取消
        </view>
    </view>
</template>

<script>
export default {
    name: "TInput",
    props: {
        placeholder: {
            type: String,
            default: '请输入'
        }
    },
    data() {
        return {
            //显示
            inputShowed: false,
            //搜索值
            inputVal: "",
        }
    },
    methods: {
        //显示
        showInput() {
            this.inputShowed = true
        },
        //
        bindInput(e) {
            const keywords = e.detail.value;
            this.$emit('searchTextChange', keywords)
        },
        //绑定搜索值
        inputTyping(e) {
            this.inputVal = e.detail.value;
            this.$emit('searchTextChange', this.inputVal)
        },
        //清空
        clearInput() {
            this.inputVal = ""
        },
        //隐藏键盘
        hideInput() {
            this.inputVal = "";
            this.inputShowed = false;
            uni.hideKeyboard(); //强行隐藏键盘
        },
    }
}
</script>

<style scoped
       lang="less">
.search-bar {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 8px 10px;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    background-color: #fff;
}

.icon-search {
    margin-right: 8px;
}

.icon-search-in-box {
    margin-right: 8rpx;
}

.search-bar-form {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    flex: auto;
    border-radius: 5px;
    background-color: #f0f0f0;
}

.search-bar-text {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
}

.search-bar-box {
    width: 100%;
    height: 30px;
    padding-left: 10px;
    padding-right: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    position: relative;
    z-index: 1;

}

.search-bar-input {
    font-size: 14px;
    flex: 1;
}

.icon-clear {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 8px;
    font-size: 0;
    display: flex;
    align-items: center;
}

.search-bar-label {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    border-radius: 3px;
    text-align: center;
    color: #9b9b9b;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;

}

.cancel-btn {
    margin-left: 10px;
    line-height: 30px;
    color: #5982fd;
    white-space: nowrap;
    font-size: 15px;
}

</style>