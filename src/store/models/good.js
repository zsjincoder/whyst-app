export default {
    state: {
        //已选商品清单
       saveGoodsInfo:{
           //商品信息
           goodsInfo:{},
           //选中的规格
           specificationValueChoose:[],
           //数量
           value: 1,
       },
        //地址id
        addressId: null
    },
    getters: {
        getSaveGoodsInfo: state => state.saveGoodsInfo,
        getAddressId: state => state.addressId,
    },
    mutations: {
        setSaveGoodsInfo: (state, data) => {
            state.saveGoodsInfo = data
        },
        setAddressId: (state, data) => {
            state.addressId = data
        },
    }
}
