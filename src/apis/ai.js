import httpInstance from "@/utils/http.js";

export const chatWithAiApi = (message) => {
    return httpInstance({
        url: '/ai/chat',
        method: 'post',
        data:{message}
    })
}