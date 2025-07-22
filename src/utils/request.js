import axios from 'axios'
import { ElMessage } from 'element-plus'
import { removeToken } from './handleToken'

// 创建 axios 实例
const http = axios.create({
    baseURL: 'https://v3pz.itndedu.com/v3pz',
    timeout: 10000,
})

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 这里可以添加 token 等操作
        const token = localStorage.getItem('token')
        // 不需要添加token的api
        const whiteURL = ['/get/code', '/user/authentication', '/login']
        if (token || !whiteURL.includes(config.url)) {
            config.headers['x-token'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
http.interceptors.response.use(
    // 同一错误拦截处理
    response => {
        if (response.data.code === -1) {
            ElMessage.warning(response.data.msg || response.data.message?.msg || response.data.message)
        }
        // token失效
        if (response.data.code === -2) {
            removeToken()
            // 跳转到登录页
            window.location.href = window.location.origin
        }
        return response.data
    },
    error => {
        // 统一错误提示
        // 可以根据 error.response.status 做不同处理
        return Promise.reject(error)
    }
)

export default http
