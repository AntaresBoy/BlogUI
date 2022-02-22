<template>
  <div class="container">
    <el-timeline v-for="item in blogInfoList" :key="item.contentId">
      <el-timeline-item
        v-if="!isEmpty"
        class="card-style"
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
            <!-- {{
              item.content.length > 100
                ? item.content.slice(1, 100) + '...'
                : item.content
            }} -->
            {{ handleContentCharNumber(item.content) }}
          </p>
          <el-button circle class="el-tag" v-if="item.tags">
            {{ item.tags }}
          </el-button>
          <div class="button-option-style">
            <el-tooltip
              class="item"
              effect="dark"
              content="查看"
              placement="top-start"
            >
              <el-button
                type="primary"
                icon="View"
                circle
                @click="handleView(item)"
              ></el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-empty
      v-if="isEmpty"
      image-size="200"
      description="您还没有写过文章，快来发布一篇文章吧~_~"
    ></el-empty>
  </div>
</template>

<script lang="ts">
import '@/assets/css/card.less'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { getAllBlogs } from '@/api/blog/blog'
import { isSuccess } from '@/utils/http/index'
import { useOpenLoading, useCloseLoading } from '@/hooks/common/useLoading'
import { useRouter } from 'vue-router'
import { InfoFilled } from '@element-plus/icons-vue'
import { openWindow } from '@/utils/index'
import { handleContentCharNumber } from '@/layouts/common/common'

export default defineComponent({
  name: 'Content',
  components: {},
  setup(props) {
    const isEmpty = ref(false)
    const router = useRouter()
    let blogInfoList = ref([])

    onMounted(async () => {
      const loadingInstance = useOpenLoading(true)
      const result = await getAllBlogs()
      if (!isSuccess(result)) {
        router.push('/login')
        useCloseLoading(loadingInstance)
        return
      }
      isEmpty.value = result.data.data.length === 0 ? true : false
      blogInfoList.value = result.data.data
      useCloseLoading(loadingInstance)
    })

    async function handleView(curItem: any) {
      if (curItem.contentId) openWindow(`/#/article/${curItem.contentId}/view`)
    }

    return {
      blogInfoList,
      isEmpty,
      InfoFilled,
      handleView,
      handleContentCharNumber,
    }
  },
})
</script>
