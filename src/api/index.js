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
    return axios.request(handleRestful(`/admin/banner`, data, method))
}

/**
 * 问题
 * @return {AxiosPromise}
 */
export const question = (data, method) => {
    return axios.request(handleRestful(`/admin/question`, data, method))
}

/**
 * 公告
 * @return {AxiosPromise}
 */
export const notice = (data, method) => {
    return axios.request(handleRestful(`/admin/notice`, data, method))
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
