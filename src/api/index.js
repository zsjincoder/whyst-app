import axios from '@/libs/axios'
import { handleRestful } from '@/libs/utils'

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