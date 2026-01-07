<script setup>
  import {ref, watch} from "vue";

  const emit = defineEmits(['on-submit'])
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true
    }
  })
  
  const dialogVisible = ref(false);
  watch(
      () => props.visible,
      (newVal) => {
        dialogVisible.value = newVal;
      },
      { immediate: true }
  )

  const commentData = ref({
    username: '',
    content: '',
    iconurl: ''
  });
  const onsubmit = function (){
    // 把数据回传给父组件
    emit('on-submit', commentData.value);
  }
</script>

<template>
  <el-dialog v-model="dialogVisible" title="编辑留言">
    <el-form label-position="top">
      <el-form-item label="用户名">
        <el-input v-model="commentData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="留言内容">
        <el-input v-model="commentData.content" placeholder="请输入留言内容"></el-input>
      </el-form-item>
      <el-form-item label="上传文件">
        <el-input v-model="commentData.iconurl" placeholder="上传头像url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>