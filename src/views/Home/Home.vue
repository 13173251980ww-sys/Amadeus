<script setup>
  import {testApi} from "@/apis/test.js";
  import {onMounted} from "vue";
  setTimeout(async () => {
        await testApi();
      }
  ,3000)
</script>

<template>
  <div class="home-page">
    <h1>首页</h1>
    <p>欢迎来到 Amadeus 前端项目。</p>
  </div>
</template>

<style scoped>
.home-page {
  padding: 24px;
}
</style>
