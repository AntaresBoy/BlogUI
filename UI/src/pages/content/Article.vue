<template>
  <div class="article">
    <h1 class="article-title-style" v-if="isViewType">{{ title }}</h1>
    <el-row class="el-row title-input-style" type="flex">
      <el-col :span="16" class="el-col">
        <el-input
          v-if="!isViewType"
          placeholder="标题"
          :title="title"
          v-model="title"
        ></el-input>
      </el-col>
      <el-col :span="7" class="el-col tag-select-style">
        <el-select
          v-if="!isViewType"
          clearable
          v-model="selectedTags"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="请选择文章所属类别"
        >
          <el-option
            v-for="item in TAGS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <MdEditor ref="mdEditor" thume="github" :onSave="onSave"></MdEditor>
  </div>
</template>

<script lang="ts">
import '@/assets/css/article.less'
import { useRoute } from 'vue-router'
import { useMessage, useCloser } from '@/hooks/web/useMessage'
import {
  defineComponent,
  reactive,
  ref,
  defineAsyncComponent,
  onMounted,
} from 'vue'
import { getDetailById, updateBlogById, newBlogApi } from '@/api/blog/blog'
import { isSuccess } from '@/utils/http/index'
import { UpdateBlogType, NewBlogType } from '@/api/model/blogsModel'
import { TAGS } from '@/config/const/const'
import { useOpenLoading, useCloseLoading } from '@/hooks/common/useLoading'

export default defineComponent({
  name: 'Article',
  components: {
    MdEditor: defineAsyncComponent(() =>
      import('@/components/md-editor/MdEditor.vue')
    ),
  },
  setup(props, context) {
    const { params } = useRoute()
    const isViewType = ref<boolean>(false)
    const mdEditor: any = ref(null)
    let title = ref('')
    let selectedTags = ref<string[]>([])

    async function newBlog() {
      const data: NewBlogType = {
        tags: selectedTags.value,
        title: title.value,
        content: mdEditor.value.content,
      }
      const result = await newBlogApi(data)
      if (isSuccess(result)) {
        useCloser('创建')
      } else {
        useMessage('创建失败!', 'error')
      }
    }

    async function getBlogDetail(contentId: string) {
      const instance = useOpenLoading(true)
      const result: any = await getDetailById(contentId)
      const type = params.type
      if (isSuccess(result)) {
        setTimeout(() => {
          if (mdEditor.value && type === 'edit') {
            mdEditor.value.mode = 'editable'
          } else {
            mdEditor.value.mode = 'preview'
          }
          mdEditor.value.content = result.data.data.content
        }, 100)
        title.value = result.data.data.title
        selectedTags.value = result.data.data.tags.split(',')
      } else {
        useMessage('获取文章失败！', 'error')
      }
      useCloseLoading(instance)
    }

    onMounted(async () => {
      isViewType.value = params.type === 'view' ? true : false
      if ((params.contentId as string) !== 'newBlog') {
        getBlogDetail(params.contentId as string)
      }
    })

    async function updateBlog(contentId: string) {
      const data: UpdateBlogType = {
        content: mdEditor.value.content,
        title: title.value,
        contentId,
        tags: selectedTags.value,
      }
      const result: any = await updateBlogById(data)
      if (isSuccess(result)) {
        useCloser('更新')
      } else {
        useMessage('博客更新失败！', 'error')
      }
    }

    async function onSave() {
      if ((params.contentId as string) !== 'newBlog') {
        updateBlog(params.contentId as string)
      } else {
        newBlog()
      }
    }

    return {
      title,
      mdEditor,
      onSave,
      TAGS,
      selectedTags,
      isViewType,
    }
  },
})
</script>
