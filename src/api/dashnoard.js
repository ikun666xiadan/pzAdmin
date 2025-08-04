import request from "../utils/request"

// 获取首页信息
const getHomeInfoAPI = () => {
    return request.get('/report')
}

export  { getHomeInfoAPI }