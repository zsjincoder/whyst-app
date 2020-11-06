import Vue from "vue";
import {needToLoadMore} from "@/libs/utils";
import global from "@/libs/global";

export default {
    install: ()=>{
        Vue.prototype.needToLoadMore = needToLoadMore;
        Vue.prototype.global = global;
    }
}
