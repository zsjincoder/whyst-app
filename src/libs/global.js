export default {
    orderStatus: [
        {key: 0, value: '待支付'},
        {key: 1, value: '支付成功'},
        {key: 2, value: '转入退款'},
        {key: 3, value: '订单关闭'},
        {key: 4, value: '支付失败'}
    ],
    getGlobalValue: function(key, arrayKey){
        let item = this[arrayKey].find(item => item.key === key)
        return item !== undefined ? item.value : ''
    }
}
