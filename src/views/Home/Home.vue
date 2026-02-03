<script setup>
  import {chatWithAiApi} from "@/apis/ai.js";
  import {ref} from "vue";

  const input=ref('');
  const output=ref('');
  const postMessage=()=>{
    output.value = ''

    chatWithAiApi({
      message:input.value,
      onmessage(chunk){
        output.value+=chunk;
      },
    })
  }

</script>

<template>
  <div class="home-page">
    <div class="banner"></div>
    <div class="chat">
      <h2 class="chat-title">Amadeus</h2>
      <div class="chat-main">
        <div class="chat-ask">
          <el-input v-model="input" placeholder="与牧濑红莉栖对话..." class="chat-input"></el-input>
          <button class="submit-circle" type="button" @click="postMessage">
            <svg class="submit-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <!-- 横线 -->
              <path d="M4 12h10" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <!-- 箭头 -->
              <path d="M13 6l7 6-7 6" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          </button>
        </div>
        <div class="chat-show">{{output}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* 整体页面居中 */
  .home-page{
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  .banner{
    position: absolute;
    width: 100%;
    height: 400px;
    background-size: cover;
    background-image: url("@/assets/background/banner.png");
    z-index: -1;
  }
  
  .banner:after{
    display: block;
    position: absolute;
    content: "";
    bottom: -50px;
    z-index:2;
    width:100%;
    height: 88px;
    background-image: url("@/assets/background/banner-wave.png");
    bgckground-size: 100% 100%;

  }
  
   .chat{
      margin: 0 auto;
      padding: 40px;
      border-radius: 8px;
      height: 280px;
    }

  .chat-main{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chat-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;

    /* 渐变文字填充 */
    background: linear-gradient(90deg, #d35400 0%, #b8860b 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }


  .chat-ask{
    width: 780px;
    display: flex;
    margin-bottom: 10px;
    position: relative;
  }

  .chat-input{
    background: #f9f9f9;
  }

  .chat-show{
    width: 780px;
    min-height: 150px;
    padding: 12px;
    background:rgb(28,28,28);
    border: 1px solid #ddd;
    border-radius: 4px;
    white-space: pre-wrap; /* 保持换行格式 */
  }


  .submit-circle {
    position: absolute;
    right: 10px;
    top: 450%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    /* 左->右 暗橙 到 暗金 渐变 */
    background: linear-gradient(90deg, #d35400 0%, #b8860b 100%);
    color: transparent; /* 使用 SVG 作为图标，文本颜色隐藏 */
    font-weight: 700; /* 保留字体加粗（若使用文本作为回退） */
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    transition: transform 0.15s ease, filter 0.15s ease;
    font-size: 18px;
    line-height: 1;
  }

  .submit-icon {
    width: 16px;
    height: 16px;
    display: block;
  }

  .submit-circle:hover {
    transform: translateY(-50%) scale(1.04);
    filter: brightness(0.95);
  }

  .submit-circle:active {
    transform: translateY(-50%) scale(0.98);
  }
</style>
