import request from "../utils/request"

// 获取菜单数据
const getMenuAPI = ()=>{
    return request.get('/user/getmenu')
}

// 权限修改
const setMenuAPI = (data)=>{
    return request.post('/user/setmenu',data)
}

export  { getMenuAPI, setMenuAPI }