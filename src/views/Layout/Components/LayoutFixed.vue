<script lang="ts" setup>
import NavUI from "@/components/NavUI.vue";
import {useRoutePath} from "@/composables/useRoutePath"
const current =useRoutePath();

import {useScroll} from '@vueuse/core'
const {y}=useScroll(window)

</script>

<template>
  <div class="fixedNav" :class="{show:y>78}">
    <NavUI :current="current"/>
  </div>
</template>

<style scoped lang="scss">
.fixedNav{
  width: 100%;
  height: 7vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;

  //状态一：往上平移自身高度+完全透明
  transform:translateY(-100%);
  opacity: 0;

  //状态二：移除平移+完全不透明
  &.show{
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
}

</style>


