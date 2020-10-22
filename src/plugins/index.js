import Vue from "vue";
import common from "@/plugins/common/common";
import func from "@/plugins/func";

export default {
    install:()=>{
        Vue.use(common);
        Vue.use(func);
    }
}
