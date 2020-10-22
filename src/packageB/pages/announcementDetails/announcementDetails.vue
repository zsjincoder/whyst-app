<template>
	<view v-html="detail" class="a-details"></view>
</template>

<script>
	import {notice} from "@/api";

	export default {
		data() {
			return {
				detail: ""
			}
		},
		onLoad(e){
			this.getAdInfo(e.id)
		},
		methods: {
			getAdInfo(id){
				notice({id},"get").then(res=>{
					this.detail = res.content
				})
			}
		}
	}
</script>

<style lang="less">
page{
	background-color: #f6f6f6;
}

.a-details {
	width: 100%;
	height: 100%;
}
</style>
