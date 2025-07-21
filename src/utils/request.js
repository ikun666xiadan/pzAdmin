import axios from 'axios'
import { ElMessage } from 'element-plus'

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
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
http.interceptors.response.use(
    response => {
        if (response.data.code === -1) {
            ElMessage.warning(response.data.msg || response.data.message?.msg || response.data.message)
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
