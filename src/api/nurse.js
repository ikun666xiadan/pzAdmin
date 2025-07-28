import request from "../utils/request"

// 创建陪护师
const createNurseAPI = (data)=>{
    return request.get('/companion',data)
}

// 获取陪护师列表
const getNurseListAPI = (params)=>{
    return request.get('/companion/list',{params})
}


export { getNurseListAPI, createNurseAPI }