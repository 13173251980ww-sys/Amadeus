import httpInstance from "@/utils/http.js";

export const getCommentsApi = (()=>{
    return httpInstance({
            url:'/comment',
            method:'get',
        }
    )
})