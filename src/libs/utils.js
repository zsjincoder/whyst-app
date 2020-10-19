/**
 * 处理restfulApi参数
 * @param sendURL
 * @param data
 * @param method
 * @param headers
 */
export const handleRestful = (sendURL, data, method, headers = {}) => {
    let url = ''
    if (method === 'delete') {
        url += `${sendURL}/${data}`
    } else if (method === 'post' || method === 'put' || 'get') {
        url = data.hasOwnProperty('id') ? `${sendURL}/${data.id}` : sendURL
    } else {
        url = sendURL
    }
    switch (method) {
        case 'get': return { url, params: data, method, headers }
        case 'post': return { url, data, method, headers }
        case 'put': return { url, data, method, headers }
        case 'delete': return { url, method, headers }
    }
}