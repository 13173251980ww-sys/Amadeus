<!--<script setup>-->

<!--</script>-->

<!--<template>-->
<!--  <div class="friendLink-page">-->

<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--  .friendLink-page{-->
<!--    background: black url('@/assets/background/bg_01.jpg') no-repeat center top;-->
<!--    min-height: 100vh;-->
<!--  }-->
<!--</style>-->

<template>
  <el-upload
      class="avatar-uploader"
      action="http://localhost:8080/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :headers="{token:token}"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

//el-upload 组件的 action 属性默认使用浏览器原生的上传行为，不会自动使用你项目中配置的 Axios 拦截器（比如自动添加 Token）。
//获取token,让el-upload组件携带token上传图片
const token = localStorage.getItem('token')

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像必须是 JPG 格式~')
    console.log(111)
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像的大小不能超过2MB~')
    console.log(222)
    return false
  }
  return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>