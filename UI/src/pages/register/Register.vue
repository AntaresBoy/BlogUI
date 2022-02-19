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
        :model="registerInfo"
        class="login_form"
        label-position="top"
      >
        <!-- 用户名 -->
        <el-form-item label="账号*">
          <el-input
            autocomplete="off"
            placeholder="手机或邮箱"
            type="text"
            v-model="registerInfo.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码*">
          <el-input
            type="password"
            placeholder="密码不少于6位"
            autocomplete="off"
            v-model="registerInfo.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-row justify="center">
          <el-form-item class="login_btn">
            <el-button type="info" @click="handleRegister" class="register-button-style" :disabled="registerIsDisabled">注册</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/login/login.less'
import { reactive, toRaw,computed } from 'vue'
import router from '@/router'
import { register } from '@/api/user/user'
import { useMessage } from '@/hooks/web/useMessage'
import { ResponseNumberEnum } from '@/config/enums/httpEnums'

const handleRegister = async () => {
 const data = { ...toRaw(registerInfo) }
  const result = await register(data)
  if(registerInfo.password==="" || registerInfo.username===""){
    useMessage('请输入用户名和密码!')
    return;
  }
  if (result.data.errno === ResponseNumberEnum.SUCCESS) {
    useMessage('注册成功!', 'success')
    router.push('/login')
    return
  }
  useMessage('注册失败!', 'error')
}
const registerIsDisabled=computed(()=>{
  return registerInfo.username.length<3 || registerInfo.password.length<6
})

const registerInfo = reactive({
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