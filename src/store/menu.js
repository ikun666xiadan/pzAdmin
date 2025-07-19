const state = {
    isCollapse: false,
    selectedMenu: [],
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
    }
}

export default {
    state,
    mutations
}