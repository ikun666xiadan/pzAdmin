import request from "../utils/request"

// 获取账号管理列表数据
const getAuthDataAPI = (params)=>{
    return request.get('/auth/admin',{params})
}

// 获取权限下拉列表数据
const getSelectListAPI = ()=>{
    return request.get('/menu/selectlist',)
}

export { getAuthDataAPI, getSelectListAPI }