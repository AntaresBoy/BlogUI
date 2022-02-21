<template>
  <el-container class="common-layout">
    <el-menu background-color="#545c64"
             text-color="#fff"
             left
             active-text-color="#ffd04b"
             mode="horizontal"
             class="el-menu-style"
             @select="handleSelect">
      <el-menu-item index="HomeIndex">AntaresLpq的技术博客</el-menu-item>
      <el-menu-item index="Home">首页</el-menu-item>
      <el-menu-item index="Focus">关注</el-menu-item>
      <el-menu-item index="Recommend">推荐</el-menu-item>
      <el-menu-item index="Newest">最新</el-menu-item>
      <el-menu-item index="Featured">精选</el-menu-item>
      <el-menu-item index="Resource">资源</el-menu-item>

      <div class="search-input-style">
        <el-input v-model="searchValue"
                  clearable
                  show-word-limit="true"
                  class="w-50 m-2"
                  placeholder="搜索文章/用户">
          <template #append>
            <el-button icon="Search"
                       @click="handleSearch"></el-button>
          </template>
        </el-input>
      </div>

      <div id="sub-menu-style">
        <el-sub-menu>
          <template #title>
            <el-avatar size="large"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
            </el-avatar>
          </template>
          <el-menu-item index="NewBlog">
            <el-icon size="20">
              <plus />
            </el-icon>新建博客
          </el-menu-item>

          <el-menu-item index="MyBlog">
            <el-icon size="20">
              <notebook />
            </el-icon>我的博客
          </el-menu-item>
          <el-menu-item index="Collect">
            <el-icon size="20">
              <star />
            </el-icon>我的收藏
          </el-menu-item>
          <el-menu-item index="SignOut">
            <el-icon size="20">
              <switch-button />
            </el-icon>退出登录
          </el-menu-item>
        </el-sub-menu>
      </div>

    </el-menu>
    <el-main>
      <ContentCard v-if="!isMyBlogsVisible"></ContentCard>
      <MyBlogs v-if="isMyBlogsVisible"></MyBlogs>
    </el-main>
    <el-footer>
      <el-row>
        <p class="copy-right-style"><small> Copyright &copy;2022 AntaresLpq </small>
          <el-button class="github-style"
                     size="small"
                     @click="handleToGithub"
                     circle>
            <img src="@/assets/imgs/github.svg"
                 alt="github">
          </el-button>
        </p>
      </el-row>
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
    ContentCard: defineAsyncComponent(() =>
      import("@/layouts/content/ContentCard.vue")
    ),
    MyBlogs: defineAsyncComponent(() => import("@/pages/content/MyBlogs.vue"))
  },
  setup(props, context) {
    const router = useRouter();
    const isMyBlogsVisible = ref(false);
    const searchValue = ref("");

    function handleToGithub() {
      openWindow(GITHUB_URL);
    }

    async function handleToHome() {
      isMyBlogsVisible.value = false;
      router.push("/home");
    }

    function handleToFeatured() {
      openWindow(GITHUB_URL);
    }

    function handleToNewest() {
      openWindow(CSDN_URL);
    }

    function handleToRecommend() {
      useMessage("开发中...", "info");
    }

    function handleToArchives() {
      useMessage("开发中...", "info");
    }

    function handleToFocus() {
      useMessage("开发中...", "info");
    }

    function handleToResource() {
      openWindow(JUEJIN_URL);
    }

    function handleToHomeIndex() {
      router.push("/home");
      location.reload();
    }

    function handleNewBlog() {
      openWindow("/#/article/newBlog/edit");
    }

    function handleToMyBlog() {
      isMyBlogsVisible.value = true;
      router.push(`/my-blog/${localStorage.getItem("username")}`);
    }

    function handleToCollect() {
      useMessage("开发中...", "info");
    }

    function handleToSignOut() {
      router.push("/login");
    }

    function handleSearch() {
      console.log("handleSearch", searchValue.value);
    }

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log("handleSelect", key, keyPath);
      switch (key) {
        case "Home":
          handleToHome();
          break;
        case "Focus":
          handleToFocus();
          break;
        case "Recommend":
          handleToRecommend();
          break;
        case "Newest":
          handleToNewest();
          break;
        case "Featured":
          handleToFeatured();
          break;
        case "Resource":
          handleToResource();
          break;
        case "HomeIndex":
          handleToHomeIndex();
          break;
        case "NewBlog":
          handleNewBlog();
          break;
        case "MyBlog":
          handleToMyBlog();
          break;
        case "Collect":
          handleToCollect();
          break;
        case "SignOut":
          handleToSignOut();
          break;
      }
    };

    return {
      handleToHome,
      handleToArchives,
      handleSelect,
      searchValue,
      isMyBlogsVisible,
      handleToGithub,
      handleSearch
    };
  }
});
</script>

<style lang="less" scoped>
.common-layout {
  margin: auto 1px;
  .el-footer {
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    line-height: 60px;
    margin-bottom: 1px;
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

#sub-menu-style {
  position: absolute;
  right: 1px;
}

.search-input-style {
  position: relative;
  margin: auto 1px;
}

.copy-right-style {
  text-align: center;
  margin: auto;
}

img {
  width: 2rem;
}
.github-style {
  position: relative;
  top: 11px;
  margin-left: 5px;
}
</style>
