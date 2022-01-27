<template>
  <el-container class="common-layout">
    <!-- <el-aside width="200px">Aside</el-aside> -->
    <el-container>
      <el-header>
        <el-link id="header-title">AntaresLpq的技术博客</el-link>
        <div class="right-header">
          <el-link @click="handleToHome">HOME</el-link>
          <el-link @click="handleToGitHub">Github</el-link>
          <el-link>ARCHIVES</el-link>
          <el-link>CSDN</el-link>
          <el-link>CATEGORIES</el-link>
          <el-link @click="handleLearningMaterials">学习资料</el-link>
          <el-link @click="handleLogin">登录</el-link>
          <el-link>注册</el-link>
        </div>
      </el-header>
      <el-main>
        <ContentCard></ContentCard>
      </el-main>
      <el-footer>
        <p><small> Copyright &copy;2022 AntaresLpq</small></p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { defineComponent, onMounted, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "@/hooks/web/useMessage";
import { GITHUB_URL } from "@/config/const/const";
import { openWindow } from "@/utils/index";
import { getBlogList, getBlogDetail } from "@/api/blog/blog";

export default defineComponent({
  name: "Layout",
  components: {
    ContentCard: defineAsyncComponent(() =>
      import("@/layouts/content/ContentCard.vue")
    )
  },
  setup(props, context) {
    const router = useRouter();
    console.log("setup", props, context);
    onMounted(async () => {
      const result = await getBlogList();
      console.log("onMounted", result);
    });

    function handleLogin() {
      console.log("handleLogin");
      router.push("/login");
    }

    function handleToGitHub() {
      openWindow(GITHUB_URL);
    }

    async function handleToHome() {
      console.log("handleToHome");
    }

    function handleLearningMaterials() {
      openWindow("http://huang303513.github.io/");
    }

    return {
      handleToHome,
      handleLogin,
      handleToGitHub,
      handleLearningMaterials
    };
  }
});
</script>

<style lang="less" scoped>
.common-layout {
  margin: auto 1px;
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }
  .el-header {
    background-color: skyblue;
    .el-link {
      margin-right: 20px;
      float: left;
      font-size: 1rem;
      font-weight: bold;
      color: white;
    }
    .right-header {
      float: right;
    }
  }

  .el-footer {
    line-height: 60px;
    margin-bottom: 1px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 100%;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 560px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 820px;
  }
}
</style>
