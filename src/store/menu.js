const localData = localStorage.getItem('pz_persistedState')

const state = localData ? {
    ...JSON.parse(localData).menu,
    selectedMenu: [] // 每次启动时都清空面包屑导航
} : {
    isCollapse: false,
    selectedMenu: [],
    routerList:[],
    initActiveMenu:'1-1'
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
    clearSelectedMenu(state) {
        // 清空面包屑导航
        state.selectedMenu = []
    },
    // 根据路由路径设置激活菜单项
    setActiveMenuByPath(state, path) {
        const findMenuId = (menuList, parentIndex = '1') => {
            for (let item of menuList) {
                const currentIndex = `${parentIndex}-${item.meta.id}`
                if (item.meta.path === path) {
                    state.initActiveMenu = currentIndex
                    return currentIndex
                }
                if (item.children && item.children.length > 0) {
                    const found = findMenuId(item.children, currentIndex)
                    if (found) return found
                }
            }
            return null
        }
        
        if (state.routerList && state.routerList.length > 0) {
            const found = findMenuId(state.routerList)
            // 如果没有找到匹配的路径，保持当前激活状态不变
            if (!found) {
                // 可以设置一个默认值或者保持当前状态
                console.warn(`未找到路径 ${path} 对应的菜单项`)
            }
        }
    },
    dynamicMenu(state,payload){
        // 通过glob导入文件
        const modules = import.meta.glob('../views/**/**/*.vue')
        const routerSet = (router)=>{
            router.forEach( item =>{
                // 判断没有子菜单，拼接路由数据
                if(!item.children){
                    const url = `../views${item.meta.path}/index.vue`
                    // 拿到获取的vue组件
                    item.component = modules[url]
                }else{
                    routerSet(item.children)
                }
            })
        }
        routerSet(payload)
        // 拿到完整的路由数据
        state.routerList = payload
    },
    setInitActiveMenu(state,payload){
        state.initActiveMenu = payload
    }
}

export default {
    state,
    mutations
}