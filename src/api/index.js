import axios from '@/libs/axios'
import { handleRestful } from '@/libs/utils'

/**
 * 小程序登录
 * @return {AxiosPromise}
 */
export const login = (data, method) => {
    return axios.request(handleRestful(`/index/mini_program/login`, data, method))
}

/**
 * 获取用户信息
 * @return {AxiosPromise}
 */
export const getInfo = (data, method) => {
    return axios.request(handleRestful(`/member/info`, data, method))
}


/**
 * banner
 * @return {AxiosPromise}
 */
export const banner = (data, method) => {
    return axios.request(handleRestful(`/index/banner`, data, method))
}

/**
 * 问题
 * @return {AxiosPromise}
 */
export const question = (data, method) => {
    return axios.request(handleRestful(`/index/question`, data, method))
}

/**
 * 公告
 * @return {AxiosPromise}
 */
export const notice = (data, method) => {
    return axios.request(handleRestful(`/index/notice`, data, method))
}

/**
 * 商品列表
 * @return {AxiosPromise}
 */
export const goods = (data, method) => {
    return axios.request(handleRestful(`/member/goods`, data, method))
}

/**
 * 收货地址
 * @return {AxiosPromise}
 */
export const shippingAddress = (data, method) => {
    return axios.request(handleRestful(`/member/shipping_address`, data, method))
}

/**
 * 获取用户积分
 * @return {AxiosPromise}
 */
export const Integral = (data, method) => {
    return axios.request(handleRestful(`/member/Integral`, data, method))
}

/**
 * 用户积分充值
 * @return {AxiosPromise}
 */
export const recharge = (data, method) => {
    return axios.request(handleRestful(`/member/integral/recharge`, data, method))
}

/**
 * 用户积分提现
 * @return {AxiosPromise}
 */
export const withdrawMoney = (data, method) => {
    return axios.request(handleRestful(`/member/withdraw`, data, method))
}

/**
 * 用户手机号码解密
 * @return {AxiosPromise}
 */
export const decrypt = (data, method) => {
    return axios.request(handleRestful(`/member/info/decrypt`, data, method))
}

/**
 * 短信验证码
 * @return {AxiosPromise}
 */
export const sendShortMessage = (data, method) => {
    return axios.request(handleRestful(`/index/short_message/send`, data, method))
}

/**
 * 收支记录
 * @return {AxiosPromise}
 */
export const incomeExpenditure = (data, method) => {
    return axios.request(handleRestful(`/member/integral/income_expenditure`, data, method))
}

/**
 * 下级会员列表
 * @return {AxiosPromise}
 */
export const subordinate = (data, method) => {
    return axios.request(handleRestful(`/member/team/subordinate`, data, method))
}

/**
 * 门店信息
 * @return {AxiosPromise}
 */
export const getStore = (data, method) => {
    return axios.request(handleRestful(`/member/store`, data, method))
}

/**
 * 排行榜
 * @return {AxiosPromise}
 */
export const leaderboard = (timeUnit, data={}, method='get') => {
    return axios.request(handleRestful(`/member/integral/${timeUnit}/leaderboard`, data, method))
}

/**
 * 修改用户信息
 * @return {AxiosPromise}
 */
export const editInfo = (data, method) => {
    return axios.request(handleRestful(`/member/info`, data, method))
}

/**
 * 新增/修改提现设置
 * @return {AxiosPromise}
 */
export const paramsSet = (data, method) => {
    return axios.request(handleRestful(`/member/withdraw/params/set`, data, method))
}

/**
 * 文件上传
 * @return {AxiosPromise}
 */
export const updateFile = (data, method) => {
    return axios.request(handleRestful(`/index/file`, data, method))
}

/**
 * 获取推广码
 * @return {AxiosPromise}
 */
export const unLimit = (data, method) => {
    return axios.request(handleRestful(`/member/mini_program/unlimit`, data, method))
}

/**
 * 商品详情
 * @return {AxiosPromise}
 */
export const detail = (data={},goodsId, method) => {
    return axios.request(handleRestful(`/member/goods/detail/${goodsId}`, data, method))
}

/**
 * 商品库存（规格值查询）
 * @return {AxiosPromise}
 */
export const goodsAttrs = (data, method) => {
    return axios.request(handleRestful(`/member/goods/attrs`, data, method))
}

/**
 * 创建订单
 * @return {AxiosPromise}
 */
export const mallOrder = (data, method) => {
    return axios.request(handleRestful(`/member/order`, data, method))
}

/**
 * 物流信息查询
 * @return {AxiosPromise}
 */
export const logistics = (data, method) => {
    return axios.request(handleRestful(`/member/order/logistics`, data, method))
}

/**
 * vip 商品
 * @return {AxiosPromise}
 */
export const vipGoods = (data, method) => {
    return axios.request(handleRestful(`/member/goods/vip_goods`, data, method))
}

/**
 * 核销码
 * @return {AxiosPromise}
 */
export const writeOffCode = (data, method) => {
    return axios.request(handleRestful(`/member/write_off_code`, data, method))
}

/**
 * 核销码状态
 * @return {AxiosPromise}
 */
export const writeOffCodeStatus = (data, method) => {
    return axios.request(handleRestful(`/member/write_off_code/status`, data, method))
}

/**
 * 查询客服
 * @return {AxiosPromise}
 */
export const customerService = (data, method) => {
    return axios.request(handleRestful(`/index/customer_service`, data, method))
}

/**
 * 滚动消息
 * @return {AxiosPromise}
 */
export const scrollMessage = (data, method) => {
    return axios.request(handleRestful(`/index/scroll_message`, data, method))
}
