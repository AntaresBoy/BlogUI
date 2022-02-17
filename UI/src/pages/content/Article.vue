<template>
  <div class="article">
    <el-row class="el-row" type="flex">
      <el-col :span="16" class="el-col">
        <el-input placeholder="标题" :title="title" v-model="title"></el-input>
      </el-col>
      <el-col :span="8" class="el-col">
        <el-select
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

export default defineComponent({
  name: 'Article',
  components: {
    MdEditor: defineAsyncComponent(() =>
      import('@/components/md-editor/MdEditor.vue')
    ),
  },
  setup(props, context) {
    const { params } = useRoute()
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
    }

    onMounted(async () => {
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
    }
  },
})
</script>

<style lang="less" scoped>
#tinymce {
  margin: 10px 10px;
}
button {
  margin-left: 50%;
  margin-top: 1px;
}
/deep/ #el-input-style {
  margin-top: 10px;
  margin-bottom: 20px;
}
.article {
  margin: 5px 5px;
}
</style>
