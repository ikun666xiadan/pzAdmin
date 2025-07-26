import { createStore } from "vuex"
import menu from "./menu"
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    // 动态路由持久化(相当于存入到本地)
    plugins:[new createPersistedState({
        key:'pz_persistedState'
    })],
    modules:{
        menu
    }
})

export default store