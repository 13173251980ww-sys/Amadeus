<script setup>
  import {testApi} from "@/apis/test.js";
  import {onMounted} from "vue";
  import NavUI from "@/components/NavUI.vue";
  setTimeout(async () => {
        await testApi();
      }
  ,3000)
</script>

<template>
  <NavUI />
</template>

<style scoped>
.home-page {
  padding: 24px;
}
</style>
