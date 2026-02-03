<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {useUserStore} from "@/stores/useUserStores.js";
import {storeToRefs} from "pinia";
const userStore=useUserStore();

const router = useRouter()
const formRef = ref(null)
const form = ref({ username: '', password: '' })

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const onSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate(async valid => {
    if (!valid) return

    await userStore.getLoginInfo(form.value)
    const {loginInfo}=storeToRefs(userStore)
    // console.log(loginInfo.value)
    const {code}=loginInfo.value;
    if(code===200){
      ElMessage({ type: 'success', message: '登录成功！', showClose: false })
      localStorage.setItem('token',JSON.stringify(loginInfo.value.data.token))
      router.push({ path: '/' })
    }else if(code===401){
      ElMessage({  message: '用户名或密码错误！', showClose: false })
    }else{
      ElMessage({  message: `报错+${code}`, showClose: false })
    }
  })
}

</script>

<template>
  <div class="login-page">
    <div class="code-bg" aria-hidden="true">
      <div class="code-row" style="--top:6%;  --start:300%; --dur:24s; --delay:-6s;  --blur:2.2px; --opacity:0.88; --size:16px">11001010 00110101 11100011 01010101 10101010 00110011</div>
      <div class="code-row" style="--top:14%; --start:220%; --dur:18s; --delay:-1s;  --blur:1.8px; --opacity:0.90; --size:14px">01101100 10011001 10101010 01010101 11110000 00001111</div>
      <div class="code-row" style="--top:20%; --start:95%;  --dur:26s; --delay:-10s; --blur:2.4px; --opacity:0.86; --size:15px">10101010 01010101 00110011 11001100 11110000 00000011</div>
      <div class="code-row" style="--top:28%; --start:10%;  --dur:20s; --delay:2s;   --blur:1.2px; --opacity:0.90; --size:13px">00011100 11100011 00110011 01010101 10100110 01010110</div>
      <div class="code-row" style="--top:40%; --start:145%; --dur:30s; --delay:-12s; --blur:2.0px; --opacity:0.92; --size:14px">10011001 01100110 11001100 00110011 10101010 01001001</div>
      <div class="code-row" style="--top:52%; --start:60%;  --dur:28s; --delay:4s;   --blur:1.6px; --opacity:0.90; --size:15px">01010101 11110000 00001111 00110011 11001100 10101010</div>
      <div class="code-row" style="--top:64%; --start:170%; --dur:19s; --delay:-3s;  --blur:2.6px; --opacity:0.87; --size:14px">11100011 00011100 10011001 01100110 01010101 10101010</div>
      <div class="code-row" style="--top:78%; --start:8%;   --dur:21s; --delay:-5s;  --blur:1.0px; --opacity:0.89; --size:13px">00110011 11001100 00001111 11110000 10011001 01010101</div>
    </div>
    <div class="login-container">
      <!--登录表单 -->
      <h2 class="login-title yuji-boku-regular">Amadeus</h2>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="username" prop="username">
          <el-input class="yuji-boku-regular full-width-input" v-model="form.username"  />
        </el-form-item>

        <el-form-item label="password" prop="password">
          <div class="password-with-button">
            <el-input class="yuji-boku-regular full-width-input" v-model="form.password" type="password" />
            <button class="submit-circle" type="button" @click="onSubmit" title="登录" aria-label="登录">
              <svg class="submit-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <!-- 横线 -->
                <path d="M4 12h10" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                <!-- 箭头 -->
                <path d="M13 6l7 6-7 6" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              </svg>
            </button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss">
.el-message{
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  /* 暗金到暗橙的渐变背景，与页面主题一致 */
  background: linear-gradient(90deg, #b8860b 0%, #d35400 100%);
  color: #0b0b0b;
  border-radius: 8px;
  padding: 10px 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.28);
  border: 1px solid rgba(0,0,0,0.12);
  /* keep existing absolute positioning (用户要求定位不变) */
  transform: translateX(120%);
  animation: el-message-slide-in 360ms cubic-bezier(.2,.9,.2,1) forwards;
  z-index: 9999;
}

.el-message__content {
  color: inherit;
  font-weight: 700;
}

/* Slide-in from right (X-axis only) */
@keyframes el-message-slide-in {
  from { transform: translateX(120%); opacity: 0; }
  to   { transform: translateX(0);   opacity: 1; }
}

/* Slide-out back to right when leaving */
.el-message-leave-active {
  animation: el-message-slide-out 320ms cubic-bezier(.2,.9,.2,1) forwards;
}
@keyframes el-message-slide-out {
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(120%); opacity: 0; }
}

.login-page {
  min-height: 100vh; /* 让背景覆盖整个视口高度 */
  background-color: $bg-color-page;
  position: relative; /* 为绝对定位的背景层提供参考 */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Code background layer */
.code-bg {
  position: absolute;
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  z-index: 0;
  pointer-events: none; /* 不影响交互 */
  overflow: hidden;
  opacity: 0.6; /* 更加不透明，让代码更明显 */
}


.code-row {
  position: absolute;
  white-space: nowrap;
  left: var(--start, 100%);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace;
  color: #efefef; /* 更亮的灰色 */
  text-shadow: 0 1px 0 rgba(0,0,0,0.25);
  font-size: var(--size, 14px);
  top: var(--top, 10%);
  transform: translateX(0);
  will-change: transform;
  opacity: var(--opacity, 0.9);
  filter: blur(var(--blur, 0px)); /* 让二进制更模糊一些 */
  animation: slide-left var(--dur, 20s) linear var(--delay, 0s) infinite;
  letter-spacing: 1px; /* 让位看起来更有颗粒感 */
  mix-blend-mode: screen; /* 更亮的混合效果 */
}

@keyframes slide-left {
  from { transform: translateX(0%); }
  to { transform: translateX(-250%); }
}

.login-container {
  position: relative;
  z-index: 2; /* 确保表单在动画层上方 */
  /* 简单容器样式占位，可按需修改 */
  width: 420px;
  padding: 32px;
  background-color: transparent; /* 去掉容器背景色 */
  border-radius: 8px;
  box-shadow: none; /* 完全去除阴影 */
}

/* 登录标题样式：居中、下间距、使用主题色 */
.login-title {
  text-align: center;
  margin-bottom: 100px;
  margin-top: -48px; /* 向上更多移动标题 */
  color: $color-primary-light;
  font-weight: 700; /* 将 h2 标题加粗 */
  font-size: 77px; /* 更大标题 */
}

/* 让 el-form 的 label 使用主题主色（$color-primary-light） */
.login-container .el-form-item__label {
  color: $color-primary-light;
}

/* 字体类：Yuji Boku */
.yuji-boku-regular {
  font-family: "Yuji Boku", serif;
  font-weight: 400;
  font-style: normal;
}

/* 密码输入及右侧小圆形提交按钮 */
.password-with-button {
  position: relative;
  width: 100%; /* 确保包装器和其他输入等宽 */
}

/* 强制让 el-input 占满可用宽度 */
.full-width-input {
  width: 100%;
}

/* 给 el-input 的内层输入区域增加右内边距，避免被圆按钮遮挡 */
.password-with-button .el-input__inner {
  padding-right: 56px; /* 按钮宽度 + 间距 */
}

.submit-circle {
  position: absolute;
  right: -42px;
   top: 50%;
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

/* Hide ElMessage close button globally to remove the x in the top-right */
.el-message__closeBtn {
  display: none !important;
}

/* ElMessage custom styles removed - restored to Element Plus defaults */
</style>