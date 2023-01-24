import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        count: 0,
        theme: 'light',
        user: null,
     },
     mutations: {
         setCount: (state, count) => state.count = count,
         setTheme: (state) => {
            if(state.theme =='light') {
            state.theme = 'dark';
         } else{
            state.theme ='light'
         }
        },
        setUser: (state, user) => (state.user = user)
     },
     getters: {
         getCount: (state) =>
         {
            return state.count
         },
         getTheme: (state) =>
         {
            return state.theme
         },
         getUser: (state) =>
         {
            return state.user
         }
     }  
 })
export default store;