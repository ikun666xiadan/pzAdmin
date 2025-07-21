import request from "../utils/request"

// 登录
const loginAPI = (data) => {
    return request.post('/login', data)
}
// 获取验证码
const getCodeAPI = (data) => {
    return request.post('/get/code', data)
}
// 注册
const createAccountAPI = (data) => {
    return request.post('/user/authentication', data)
}


export { loginAPI, getCodeAPI, createAccountAPI }