import httpInstance from "@/utils/http.js";

export const getCommentsApi = ((pageNum,pageSize)=>{
    return httpInstance({
            url:'/comment',
            method:'get',
            params:{
                pageNum,
                pageSize
            }
        }
    )
})

export const addCommentApi = (commentData)=>{
    return httpInstance({
        url:'/comment',
        method:'post',
        data:commentData
    })
}