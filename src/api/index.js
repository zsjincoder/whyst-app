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
