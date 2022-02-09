<template>
  <div>
    <el-input placeholder="标题"
              id="el-input-style"></el-input>
    <editor id="tinymce"
            v-model="value"
            :disabled="disabled"
            :init="init"></editor>
    <el-button type='error'
               size='small'
               @click="handleClear">清空内容</el-button>
    <el-button type='info'
               size='small'
               @click="disabled = true">禁用</el-button>
    <el-button type='primary'
               size='small'
               @click="handleSave">保存</el-button>
  </div>
</template>

<script lang='ts'>
import axios from "axios";
import tinymce from "tinymce";
import { useRouter, useRoute } from "vue-router";
import { useMessage } from "@/hooks/web/useMessage";
import {
  PLUGINS,
  TOOLBAR,
  CONTENT_CSS,
  SKIN_URL,
  LANGUAGE_URL
} from "@/config/const/const";
import {
  defineComponent,
  reactive,
  ref,
  defineAsyncComponent,
  onMounted
} from "vue";

export default defineComponent({
  name: "Article",
  components: {
    Editor: defineAsyncComponent(() => import("@tinymce/tinymce-vue"))
  },
  setup(props, context) {
    const { push } = useRouter();
    const { params } = useRoute();
    const value = ref("");
    const disabled = ref(false);
    const init = reactive({
      language_url: LANGUAGE_URL, // 语言包的路径
      language: "zh_CN", //语言
      skin_url: SKIN_URL, // skin路径
      content_css: CONTENT_CSS,
      height: 500, //编辑器高度
      branding: false, //是否禁用“Powered by TinyMCE”
      menubar: false, //顶部菜单栏显示
      elementpath: false,
      theme: "silver",
      placeholder: "内容",
      toolbar_mode: "scrolling",
      resize: "both",
      toolbar: TOOLBAR,
      plugins: PLUGINS,
      images_upload_handler: uploadImg
    });

    //图片上传
    function uploadImg(blobInfo: any, success: any, failure: any) {
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      axios
        .post("/upload/xxxx", formData)
        .then((res: any) => {
          if (res.status == 200) {
            success(res.data.link);
            return;
          }
          failure("上传失败");
        })
        .catch(() => {
          failure("上传出错");
        });
    }

    onMounted(() => {
      const contentId = params.contentId;
      //此处根据id从服务器获取博客详情
      // value.value = `<p>文本测试<p>`;
      console.log("onMounted", contentId);
      tinymce.init(init);
    });

    function handleClear() {
      console.log("tinymce", tinymce);
    }

    function handleSave() {
      useMessage("保存成功", "success");
      setTimeout(() => {
        window.close();
      }, 1000);
    }

    return {
      init,
      value,
      disabled,
      handleClear,
      handleSave
    };
  }
});
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
</style>
