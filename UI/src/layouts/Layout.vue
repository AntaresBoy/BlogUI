<template>
  <el-container class="common-layout">
    <!-- <el-aside width="200px">Aside</el-aside> -->
      <!-- <el-header>
        <el-link id="header-title">AntaresLpq的技术博客</el-link>
        <div class="right-header">
          <el-link @click="handleToHome">HOME</el-link>
          <el-link @click="handleToGitHub">Github</el-link>
          <el-link @click="handleToArchives">ARCHIVES</el-link>
          <el-link @click="handleToCSDN">CSDN</el-link>
          <el-link @click="handleToCategories">CATEGORIES</el-link>
          <el-link @click="handleLearningMaterials">学习资料</el-link>
          <el-dropdown @command="handleCommand">
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
            <el-avatar
              size="large"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="addBlog">新建博客</el-dropdown-item>
                <el-dropdown-item command="sign out">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
     
       
   
 
           </div>
      </el-header> -->
      <el-menu background-color="#545c64"
               text-color="#fff"
               left
               active-text-color="#ffd04b"
               mode="horizontal"
               class="el-menu-style"
               @select="handleSelect">
        <el-menu-item index="AntaresLpq">AntaresLpq的技术博客</el-menu-item>
        <el-menu-item index="HOME">HOME</el-menu-item>
        <el-menu-item index="Github">Github</el-menu-item>
        <el-menu-item index="ARCHIVES">ARCHIVES</el-menu-item>
        <el-menu-item index="CSDN">CSDN</el-menu-item>
        <el-menu-item index="5">学习资料</el-menu-item>
        <el-menu-item index="6">Processing Center</el-menu-item>
        <el-sub-menu>
          <template #title><el-avatar size="large"
                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
        </el-avatar></template>
          <el-menu-item index="addBlog">新建博客</el-menu-item>
          <el-menu-item index="sign out">退出登录</el-menu-item>
        </el-sub-menu>

      </el-menu>
      <el-main>
        <ContentCard></ContentCard>
      </el-main>
      <el-footer>
        <p><small> Copyright &copy;2022 AntaresLpq</small></p>
      </el-footer>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { openWindow } from "@/utils/index";
import { CSDN_URL, JUEJIN_URL, GITHUB_URL } from "@/config/const/const";
import { useMessage } from "@/hooks/web/useMessage";

export default defineComponent({
  name: "Layout",
  components: {
    ContentCard: defineAsyncComponent(
      () => import("@/layouts/content/ContentCard.vue")
    ),
  },
  setup(props, context) {
    const router = useRouter();
    const value = ref("");
    const options = reactive([
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
      },
      {
        value: "Option3",
        label: "Option3",
      },
      {
        value: "Option4",
        label: "Option4",
      },
      {
        value: "Option5",
        label: "Option5",
      },
    ]);
    async function handleToHome() {
      router.push("/home");
    }

    function handleLearningMaterials() {
      openWindow(JUEJIN_URL);
    }

    function handleCommand(command: string | number) {
      if (command === "sign out") router.push("/login");
      if (command === "addBlog") openWindow("/#/article/newBlog/edit");
    }

    function handleToGitHub() {
      openWindow(GITHUB_URL);
    }

    function handleToCSDN() {
      openWindow(CSDN_URL);
    }

    function handleToCategories() {
      useMessage("开发中...");
    }

    function handleToArchives() {
      useMessage("开发中...");
    }

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };

    return {
      handleToHome,
      handleToGitHub,
      handleLearningMaterials,
      handleCommand,
      handleToCSDN,
      handleToCategories,
      handleToArchives,
      handleSelect,
      options,
      value,
    };
  },
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
    // .right-header {
    //   float: right;
    // }
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

.el-menu-style {
  // float: right;
}
</style>
