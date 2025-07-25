import request from "../utils/request"

// 获取菜单数据
const getMenuAPI = ()=>{
    return request.get('/user/getmenu')
}

// 权限修改
const setMenuAPI = (data)=>{
    return request.post('/user/setmenu',data)
}

// 菜单权限列表
const getMenuListAPI = (params)=>{
    return request.get('/menu/list',{params})
}

// 获取用户菜单权限
const getUserMenu = ()=>{
    return request.get('/menu/permissions')
}

export  { getMenuAPI, setMenuAPI, getMenuListAPI, getUserMenu }