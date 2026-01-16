<script setup>
  import {chatWithAiApi} from "@/apis/ai.js";
  import {ref} from "vue";

  const input=ref('');
  const postMessage=async ()=>{
    const res=await chatWithAiApi({message:"你好"});
    console.log(res.data)
    const showArea=document.getElementById("show-area");
    showArea.innerText=res.data;
  }

</script>

<template>
  <div class="home-page">
    <div class="chat">
      <h2 class="chat-title">Amadeus</h2>

      <div class="chat-content">
        <el-input v-model="input" placeholder="在这里输入你的消息..." class="chat-input"></el-input>

        <div id="show-area" class="chat-show"></div>
      </div>

      <!-- 按钮放在对话框后面 -->
      <div class="chat-actions">
        <el-button class="action-btn" @click="postMessage">发送</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* 整体页面居中 */
  .home-page{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 40px 20px;
    background: black url('@/assets/background/bg_01.jpg') no-repeat center top;
    background-size: cover;
  }

  /* 聊天框样式 */
  .chat{
    width: 640px;
    max-width: 96%;
    padding: 30px 28px;
    border-radius: 16px;
    box-sizing: border-box;

  }

  .chat-title{
    margin: 0 0 18px 0;
    font-size: 1.9rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.6px;
  }

  .chat-content{
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .chat-show{
    width: 100%;
    min-height: 180px;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(6,12,20,0.6), rgba(6,12,20,0.5));
    border: 1px solid rgba(255,255,255,0.03);
    padding: 14px;
    color: #e6f2ff;
    overflow: auto;
    box-sizing: border-box;
    box-shadow: 0 4px 20px rgba(3,8,15,0.5) inset;
  }

  .chat-input{
    width: 100%;
  }

  .chat-actions{
    display: flex;
    justify-content: flex-end;
    margin-top: 18px;
  }












</style>
