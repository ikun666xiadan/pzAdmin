import request from "../utils/request"

// 获取陪护师列表
const getOrderListAPI = (params)=>{
    return request.get('/admin/order',{params})
}

// 确认服务完成
const confirmOrderAPI = (data)=>{
    return request.post('/update/order',data)
}

export { getOrderListAPI, confirmOrderAPI }