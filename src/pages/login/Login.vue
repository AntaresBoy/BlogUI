<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <!-- <div class="avatar_box">
        <img src="@/assets/imgs/sport.gif" alt="/" />
      </div> -->
      <p1>登录</p1>
      <div class="to-register-style">
        没有账号?<router-link :to="{ path: 'register' }">点击注册</router-link>
      </div>
      <!-- 登录表单区域 -->
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
            placeholder="用户名"
            type="text"
            v-model="loginInfo.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码*">
          <el-input
            type="password"
            placeholder="密码"
            autocomplete="off"
            v-model="loginInfo.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-row justify="center">
          <el-form-item class="login_btn">
            <el-button
              type="primary"
              @click="handleLogin"
              class="login-button-style"
              :disabled="loginIsDisabled"
              >登录</el-button
            >
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/login/login.less'
import { reactive, toRaw, computed } from 'vue'
import router from '@/router'
import { login } from '@/api/user/user'
import { useMessage } from '@/hooks/web/useMessage'
import { ResponseNumberEnum } from '@/config/enums/httpEnums'

const handleLogin = async () => {
  const data = { ...toRaw(loginInfo) }
  const result = await login(data)
  if (result.data.errno === ResponseNumberEnum.SUCCESS) {
    useMessage(`欢迎:${loginInfo.username}`, 'success')
    sessionStorage.setItem('isLogin', 'true')
    router.push('/home')
    localStorage.setItem('username', loginInfo.username)
    return
  }
  useMessage('登录失败！', 'error')
}

const loginIsDisabled = computed(() => {
  return loginInfo.username.length < 3 || loginInfo.password.length < 6
})

const loginInfo = reactive({
  username: '',
  password: '',
})
</script>
<style lang="less">
.login-button-style {
  color: #fff;
  width: 410px;
  background: #fe7300;
}
.to-register-style {
  position: relative;
  left: 300px;
  top: 10px;
  color: lightseagreen;
}
</style>
