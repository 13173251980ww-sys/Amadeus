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
    欢迎来到Amadeus前端项目
  </div>
</template>

<style scoped>

</style>
