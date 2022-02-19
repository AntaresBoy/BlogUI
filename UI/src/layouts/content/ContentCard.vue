<template>
  <div class="block">
    <el-timeline v-for="item in blogInfoList" :key="item.contentId">
      <el-timeline-item
        :timestamp="item.createtime"
        center
        color="hsl"
        placement="top"
      >
        <el-card>
          <h2 class="post-title">{{ item.title }}</h2>
          <p class="time-commited">
            commited by: {{ item.author }} on: {{ item.createtime }}
          </p>
          <p class="content">
            {{
              item.content.length > 1000
                ? item.content.slice(0, 200) + '...'
                : item.content
            }}
          </p>
          <el-button circle class="el-tag" v-if="item.tags">
            {{ item.tags }}
          </el-button>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top-start"
          >
            <el-button
              class="el-button"
              type="danger"
              icon="Delete"
              circle
              @click="deleteArticle(item.contentId)"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top-start"
          >
            <el-button
              type="primary"
              icon="Edit"
              class="el-button"
              circle
              @click="handleContent(item)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="查看"
            placement="top-start"
          >
            <el-button
              type="primary"
              icon="View"
              class="el-button"
              circle
              @click="handleView(item)"
            ></el-button>
          </el-tooltip>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent,  onMounted, reactive,ref } from 'vue'
import { openWindow } from '@/utils/index'
import { getBlogList, deleteBlogById } from '@/api/blog/blog'
import { isSuccess } from '@/utils/http/index'
import { useMessage } from '@/hooks/web/useMessage'
import { useOpenLoading,useCloseLoading } from '@/hooks/common/useLoading';
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Content',
  setup(props) {
    const  router= useRouter()
    let blogInfoList: any = reactive([])
    function handleContent(curItem: any) {
      if (curItem.contentId) openWindow(`/#/article/${curItem.contentId}/edit`)
    }

    onMounted(async () => {
      const loadingInstance=useOpenLoading(true)
      const result: any = await getBlogList()
      if(!isSuccess(result)){
        router.push("/login")
        return;
      }
      Object.assign(blogInfoList, result.data.data)
      useCloseLoading(loadingInstance)
    })

    async function deleteArticle(contentId: string) {
      const result = await deleteBlogById(contentId)
      if (isSuccess(result)) {
        useMessage('删除成功！', 'success')
        location.reload()
      } else {
        useMessage('删除失败！', 'error')
      }
    }

    async function handleView(curItem: any) {
      if (curItem.contentId) openWindow(`/#/article/${curItem.contentId}/view`)
    }

    return {
      handleContent,
      blogInfoList,
      deleteArticle,
      handleView,
    }
  },
})
</script>

<style lang="less" scoped>
el-card {
  background-color: skyblue;
}

.content {
  text-align: justify;
}
.post-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.time-commited {
  text-align: center;
  margin: 10px auto;
  color: rgb(26, 138, 138);
  font-weight: bold;
}
p {
  font-size: 1rem;
  text-align: justify;
}
.tag {
  position: absolute;
  left: 30px;
  bottom: 5px;
}
.el-button {
  float: right;
  margin-right: 1px;
  margin-bottom: 2px;
}
.el-tag {
  position: relative;
  float: left;
  bottom: -6px;
  left: -5px;
}
</style>
