<script lang="ts" setup>
  import {ref, watch} from "vue";
  import {Plus} from "@element-plus/icons-vue";
  import { ElMessage } from 'element-plus'

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


  //上传图片
  
  //el-upload 组件的 action 属性默认使用浏览器原生的上传行为，不会自动使用你项目中配置的 Axios 拦截器（比如自动添加 Token）。
  //获取token,让el-upload组件携带token上传图片
  const token = localStorage.getItem('token')



  const handleAvatarSuccess: UploadProps['onSuccess'] = (
      response,
      uploadFile
  ) => {
    // 修复：commentData 是一个 ref，必须通过 .value 访问其内部对象的属性
    commentData.value.iconurl = URL.createObjectURL(uploadFile.raw!)
  }

  const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('头像必须是 JPG 格式~')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElMessage.error('头像的大小不能超过2MB~')
      return false
    }
    return true
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
      <el-form-item label="上传头像">
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{token:token}"
        >
          <!-- 修复：在模板中 Vue 会自动解包 ref，因此直接使用 commentData.iconurl 即可 -->
          <img v-if="commentData.iconurl" :src="commentData.iconurl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onsubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>



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