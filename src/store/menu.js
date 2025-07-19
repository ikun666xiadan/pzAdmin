const state = {
    isCollapse: false,
    selectedMenu: [],
}

const mutations = {
    setIsCollapse(state) {
        state.isCollapse = !state.isCollapse
    }
}

export default {
    state,
    mutations
}