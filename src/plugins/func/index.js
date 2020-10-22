import Vue from "vue";
import {needToLoadMore} from "@/libs/utils";

export default {
    install: ()=>{
        Vue.prototype.needToLoadMore = needToLoadMore;
    }
}
