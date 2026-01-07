<script setup>
  import {onMounted} from "vue";

  onMounted(()=>{
    const run_time=document.getElementById("run_time");

    let day=0;
    let hour=0;
    let minute=0;
    let second=0;

    setInterval(function (){
      second++;
      if(second===60){
        second=0;
        minute++;
        minute=minute<10?"0"+minute:minute;
      }
      if(minute===60){
        minute=0;
        hour++;
        hour=hour<10?"0"+hour:hour;
      }
      if(hour===24){
        hour=0;
        day++;
        day=day<10?"0"+day:day;
      }
      second=second<10?"0"+second:second;
      run_time.innerText="本站已勉强运行"+day+"天"+hour+"时"+minute+"分"+second+"秒";
    },1000)
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