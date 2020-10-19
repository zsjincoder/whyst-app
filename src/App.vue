<script>
export default {
    onLaunch: function () {
        console.log('App Launch')
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    methods: {
        getUserInfo(){
            uni.login({
                provider: 'weixin',
                success: function (loginRes) {
                    console.log(loginRes);
                    // 获取用户信息
                    uni.getUserInfo({
                        provider: 'weixin',
                        success: (infoRes)=> {
                            console.log(infoRes)
                            console.log('用户昵称为：' + infoRes.userInfo.nickName);
                        }
                    });
                },
                fail: (err)=>{
                    console.log(err);
                    this.getUserInfo()
                }
            });
        }
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
