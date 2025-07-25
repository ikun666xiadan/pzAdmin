const state = {
    isCollapse: false,
    selectedMenu: [],
    routerList:[]
}

const mutations = {
    setIsCollapse(state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state,payload){
        if(state.selectedMenu.findIndex(item=>item.path === payload.path) === -1){
            state.selectedMenu.push(payload)
        }
    },
    removeMenu(state,payload){
        // 找到点击数据的索引
        const index = state.selectedMenu.findIndex(item => item.name === payload.name)
        // 删除指定数据
        state.selectedMenu.splice(index,1)
    },
    dynamicMenu(state,payload){
        // 通过glob导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        const roterSet = (router)=>{
            router.forEach( item =>{
                // 判断没有子菜单，拼接路由数据
                if(!item.children){
                    const url = `../views${item.meta.path}/index.vue`
                    // 拿到获取的vue组件
                    item.component = modules[url]
                }else{
                    roterSet(item.children)
                }
            })
        }
        roterSet(payload)
        // 拿到完整的路由数据
        state.routerList = payload
    }
}

export default {
    state,
    mutations
}