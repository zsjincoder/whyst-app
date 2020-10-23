<script>
    import {getAuthorization} from "@/libs/utils";

export default {
    onLaunch: function () {
        getAuthorization()
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    mounted() {
        //vConsole
        // const vConsole = require('vconsole')
        // let vc = new vConsole()
    }
}
</script>

<style>
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
/*@import "uview-ui/index.scss";*/

/*//page {*/
/*//    font-family: "微软雅黑";*/
/*//    background: #f6f6f6;*/
/*//}*/

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
