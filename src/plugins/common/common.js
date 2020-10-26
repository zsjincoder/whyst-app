import Vue from "vue";
//搜索输入框
import TInput from "@/components/t-input/TInput";
//加载更多
import LoadMore from "@/components/load_more/LoadMore";

export default {
    install:()=>{
        Vue.component('TInput',TInput);
        Vue.component('LoadMore',LoadMore);
    }
}
