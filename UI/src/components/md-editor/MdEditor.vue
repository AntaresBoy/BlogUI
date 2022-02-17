<template>
  <v-md-editor
    v-model="content"
    :mode="mode"
    thume="github"
    height="43rem"
  ></v-md-editor>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const content = ref('')
    let mode = ref('editable')

    return {
      content,
      mode,
    }
  },
})
</script>
