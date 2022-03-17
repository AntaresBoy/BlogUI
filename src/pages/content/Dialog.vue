<template>
  <el-dialog v-model="dialogVisible"
             title="发布文章"
             width="60%"
             center>
    <el-input v-model="overview"
              :rows="4"
              clearable
              autocomplete
              :autosize="{ minRows: 6, maxRows: 20 }"
              type="textarea"
              placeholder="摘要" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"
                   @click="handleRelease">保存并发布</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { ref, defineComponent,onMounted } from "vue";
export default defineComponent({
  setup(props,ctx) {
    const dialogVisible = ref(false);
    const overview = ref("");

    function handleRelease() {
      dialogVisible.value = false;
      ctx.emit('release-article',overview.value)
    }

    onMounted(()=>{
      console.log("onMounted",overview.value)
    })

    return {
      dialogVisible,
      overview,
      handleRelease,
    };
  },
});
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>