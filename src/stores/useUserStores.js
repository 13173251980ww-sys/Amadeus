import { ref} from 'vue'
import { defineStore } from 'pinia'
import {loginApi} from "@/apis/user.js";


export const useUserStore = defineStore('user', () => {
    const loginInfo=ref({})
    const getLoginInfo = async ({username,password}) => {
        const res =await loginApi({username, password});
        loginInfo.value = res.data;
    }
    return{
        loginInfo,
        getLoginInfo
    }
})

