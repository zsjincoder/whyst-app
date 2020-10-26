<template>
    <view>
        <u-loadmore :status="loading"
                    @loadmore=""
                    font-size="24"
                    margin-top="20"
                    margin-bottom="25"
                    color="#999"
                    :bg-color="'#f6f6f6'"
                    :icon-color="'#03C18C'"/>
    </view>
</template>

<script>
export default {
    name: "LoadMore",
    props:{
        //loadmore	loading / nomore
        loading:{
            type:String,
            required: true
        }
    }
}
</script>

<style scoped>
page{
    background: #F6F6F6;
}
</style>
