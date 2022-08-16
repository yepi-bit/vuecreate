import { createStore } from 'vuex'
import { ElMessage } from 'element-plus'
// @ts-ignore
import { login } from '../api/user.js'
import {reject} from "lodash";

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {
            count: 0,
            name:'',
            password:'',
            setCount: 10,
            img:'https://avatars.githubusercontent.com/u/81626835?v=4'
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_COUNT (state) {
            state.setCount ++
        }
    },
    actions: {
        // 简单
        add (context) {
            context.commit('SET_COUNT')
        },
        setNum({ commit },payload){
            return new Promise(()=>{
                setTimeout(()=>{
                    commit('SET_COUNT')
                    console.log(payload)
                    ElMessage({
                        type:'success',
                        message:'数字加1。',
                    })
                },1000)
            })
        },
        login({ commit }, userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                login({ username: username.trim(), password: password }).then(() => {
                }).catch(() => {
                    reject()
                })
            })
        },
    }
})
export default store
