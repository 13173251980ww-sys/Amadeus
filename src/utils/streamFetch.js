export async function streamFetch({
   url,
   method,
   headers = {},
   body,
   onmessage
}) {
    //自动携带令牌
    const token = localStorage.getItem('token')

    const response = await fetch(url, {
        method,
        headers:{
            token: token ? `${token}` : '',
        },
        body,
    });

    //流式更新页面
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while(true){
        const {value,done}=await reader.read();
        if(done) break;

        const chunk=decoder.decode(value,{stream:true});
        onmessage&&onmessage(chunk)
    }
}