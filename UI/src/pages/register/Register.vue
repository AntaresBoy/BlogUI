<template>
  <div class="login_container">
    <div class="login_box">
   <p1>注册</p1>
   <div class="toLogin-style">
     已有账号?<router-link to="/login">点击登录</router-link>
   </div>
      
      <!-- 注册表单区域 -->
      <el-form
        label-width="0px"
        :model="loginInfo"
        class="login_form"
        label-position="top"
      >
        <!-- 用户名 -->
        <el-form-item label="账号*">
          <el-input
            autocomplete="off"
            placeholder="手机或邮箱"
            type="text"
            v-model="loginInfo.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码*">
          <el-input
            type="password"
            placeholder="密码不少于6位"
            autocomplete="off"
            v-model="loginInfo.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-row justify="center">
          <el-form-item class="login_btn">
            <el-button type="info" @click="handleRegister" class="register-button-style">注册</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/login/login.less'
import { reactive, toRaw } from 'vue'
import router from '@/router'
import { login } from '@/api/user/user'
import { useMessage } from '@/hooks/web/useMessage'
import { ResponseNumberEnum } from '@/config/enums/httpEnums'
import {openWindow} from "@/utils/index"

const handleLogin = async () => {
  const data = { ...toRaw(loginInfo) }
  const result = await login(data)
  if (result.data.errno === ResponseNumberEnum.SUCCESS) {
    useMessage('welcome to AntaresLpq blog!', 'success')
    sessionStorage.setItem('isLogin', 'true')
    router.push('/home')
    localStorage.setItem('username', loginInfo.username)
    return
  }
  useMessage('登录失败', 'error')
}

const handleRegister = () => {
  console.log("handleRegister")
}

const loginInfo = reactive({
  username: '',
  password: '',
})
</script>

<style>
.register-button-style{
  color:  #fff;
  width:410px;
  background: #fe7300;
}
.toLogin-style{
  position: relative;
  left: 300px;
  top:10px;
  color: lightseagreen;
}
</style>