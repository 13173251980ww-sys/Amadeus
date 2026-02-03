<script setup>
  import {onMounted} from "vue";

  onMounted(() => {
    function show_runtime() {
      window.setTimeout(show_runtime, 1000);

      const start = new Date("2026/1/31 13:20:00");
      const now = new Date();
      const diff = now - start;

      const days = Math.floor(diff / (24*60*60*1000));
      const hours = Math.floor((diff / (1000*60*60)) % 24);
      const minutes = Math.floor((diff / (1000*60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const runTimeElem = document.getElementById('run_time');
      if(runTimeElem) {
        runTimeElem.textContent =
            `本站勉强运行: ${days}天${hours}小时${minutes}分${seconds}秒`;
      }
    }
    show_runtime();
  });
</script>

<template>
  <footer>
    <small>
      ©Copyright Amadeus
    </small>
    <p id="run_time">本站已勉强运行</p>
  </footer>
</template>

<style scoped>
  footer{
    height:30vh;
    width:100%;
    background-color: #0b0b0b;
    text-align: center;
    color: #bababa;
    padding: 2vh 5vh 5vh;
    line-height: 10vh;
  }
</style>