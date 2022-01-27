<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/imgs/sport.gif"
             alt="/" />
      </div>
      <!-- 登录表单区域 -->
      <el-form label-width="0px"
               ref="ruleFormRef"
               :model="loginInfo"
               class="login_form"
               label-position="top">
        <!-- 用户名 -->
        <el-form-item label="username*">
          <el-input autocomplete="off"
                    placeholder="用户名"
                    type="text"
                    v-model="loginInfo.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="password*">
          <el-input type="password"
                    placeholder="密码"
                    autocomplete="off"
                    v-model="loginInfo.password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-row justify="center">
          <el-form-item class="login_btn">
            <el-button type="primary"
                       @click="handleLogin">登录</el-button>
            <el-button type="info"
                       @click="resetForm">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@/assets/css/login/login.less";
import { reactive, toRaw } from "vue";
import router from "@/router";
import { login } from "@/api/user/user";
import { useMessage } from "@/hooks/web/useMessage";
import { ResponseNumberEnum } from "@/config/enums/httpEnums";

const handleLogin = async () => {
  const data = { ...toRaw(loginInfo) };
  const result = await login(data);
  if (result.data.errno === ResponseNumberEnum.SUCCESS) {
    useMessage("welcome to AntaresLpq blog!", "success");
    router.push("/home");
    return;
  }
  useMessage("登录失败", "error");
};

const resetForm = () => {
  console.log("resetForm", loginInfo);
  loginInfo.username = "";
  loginInfo.password = "";
};

const loginInfo = reactive({
  username: "",
  password: ""
});
</script>
