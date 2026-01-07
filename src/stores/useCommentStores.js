import {ref} from 'vue';
import {defineStore} from "pinia";
import {getCommentsApi} from "@/apis/comment.js";

export const useCommentStores =defineStore('comment',()=>{
    const commentList=ref([])
    const commentTotal=ref(0)
    const pageSize=8;
    const pageCount=Math.ceil(total / pageSize)
    const getCommentData=async ()=>{
        const res=await getCommentsApi();
        commentList.value=res.data.list;
        commentTotal.value=res.data.total;
    }
    return{
        commentTotal,
        commentList,
        getCommentData
    }
})