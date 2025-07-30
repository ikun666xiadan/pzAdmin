import request from "../utils/request"

// 创建陪护师
const createNurseAPI = (data)=>{
    return request.post('/companion',data)
}

// 获取陪护师列表
const getNurseListAPI = (params)=>{
    return request.get('/companion/list',{params})
}

// 获取陪护师头像列表
const getAvatarListAPI = ()=>{
    return request.get('/photo/list')
}

// 删除陪护师
const deleteNurseAPI = (data)=>{
    return request.post('/delete/companion',data)
}


export { getNurseListAPI, createNurseAPI, getAvatarListAPI, deleteNurseAPI }