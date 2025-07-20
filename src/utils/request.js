import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
    baseURL: '/api', // 根据需要修改
    timeout: 10000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 这里可以添加 token 等操作
        // const token = localStorage.getItem('token')
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 直接返回数据部分
        return response.data
    },
    error => {
        // 统一错误提示
        // 可以根据 error.response.status 做不同处理
        return Promise.reject(error)
    }
)

export default service
