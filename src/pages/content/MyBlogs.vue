<template>
  <div class="container">
    <el-timeline v-for="item in blogInfoList"
                 :key="item.contentId">
      <el-timeline-item v-if="!isEmpty"
                        class="card-style"
                        :timestamp="item.createtime"
                        center
                        color="hsl"
                        placement="top">
        <el-card>
          <h2 class="post-title">{{ item.title }}</h2>
          <p class="time-commited">
            commited by: {{ item.author }} on: {{ item.createtime }}
          </p>
          <p class="content">
            {{ handleContentCharNumber(item.content) }}
          </p>
          <el-button circle
                     class="el-tag"
                     v-if="item.tags">
            {{ item.tags }}
          </el-button>
          <div class="button-option-style">
            <el-tooltip class="item"
                        effect="dark"
                        content="查看"
                        placement="top-start">
              <el-button type="primary"
                         icon="View"
                         circle
                         @click="handleView(item)"></el-button>
            </el-tooltip>
            <el-tooltip class="item"
                        effect="dark"
                        content="编辑"
                        placement="top-start">
              <el-button type="primary"
                         icon="Edit"
                         circle
                         @click="handleContent(item)"></el-button>
            </el-tooltip>

            <el-popconfirm confirm-button-text="确定"
                           cancel-button-text="取消"
                           :icon="InfoFilled"
                           icon-color="red"
                           title="确定删除此条记录?"
                           @confirm="deleteArticle(item.contentId)">
              <template #reference>
                <el-button type="danger"
                           icon="Delete"
                           title="删除"
                           circle>
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-empty v-if="isEmpty"
              image-size="200"
              description="您还没有写过文章，快来发布一篇文章吧~_~"></el-empty>
  </div>
</template>

<script lang="ts">
import "@/assets/css/card.less";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { openWindow } from "@/utils/index";
import { getBlogList, deleteBlogById } from "@/api/blog/blog";
import { isSuccess } from "@/utils/http/index";
import { useMessage } from "@/hooks/web/useMessage";
import { useOpenLoading, useCloseLoading } from "@/hooks/common/useLoading";
import { useRouter } from "vue-router";
import { InfoFilled } from "@element-plus/icons-vue";
import { handleContentCharNumber } from "@/layouts/common/common";

export default defineComponent({
  name: "Content",
  components: {},
  setup(props) {
    const isEmpty = ref(false);
    const router = useRouter();
    let blogInfoList: any = ref([]);
    function handleContent(curItem: any) {
      if (curItem.contentId) openWindow(`/#/article/${curItem.contentId}/edit`);
    }

    onMounted(async () => {
      const loadingInstance = useOpenLoading(true);
      const result: any = await getBlogList();
      if (!isSuccess(result)) {
        router.push("/login");
        useCloseLoading(loadingInstance);
        return;
      }
      isEmpty.value = result.data.data.length === 0 ? true : false;
      blogInfoList.value = result.data.data;
      useCloseLoading(loadingInstance);
    });

    function delArticleByContentId(contentId: string) {
      blogInfoList.value.forEach((item: any, index: number) => {
        if (item.contentId === contentId) {
          blogInfoList.value.splice(index, 1);
        }
      });
    }

    async function deleteArticle(contentId: string) {
      const result = await deleteBlogById(contentId);
      if (isSuccess(result)) {
        delArticleByContentId(contentId);
        useMessage("删除成功！", "success");
      } else {
        useMessage("删除失败！", "error");
      }
    }

    async function handleView(curItem: any) {
      if (curItem.contentId) openWindow(`/#/article/${curItem.contentId}/view`);
    }

    return {
      handleContent,
      blogInfoList,
      deleteArticle,
      handleView,
      isEmpty,
      InfoFilled,
      handleContentCharNumber
    };
  }
});
</script>

