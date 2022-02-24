<template>
    <el-calendar ref="calendar" v-model="value">
    <template #header="{ date }">
      <span>{{ date }}</span>
      <el-button-group>
        <el-button size="small" circle @click="selectDate('prev-year')"
        type="primary"
        title="prev year"
          ><el-icon><d-arrow-left /></el-icon></el-button
        >
        <el-button size="small" title="prev month" circle type="success" @click="selectDate('prev-month')"
          ><el-icon><arrow-left-bold /></el-icon></el-button
        >
        <el-button size="small" title="today" type="danger" @click="selectDate('today')"><el-icon><location /></el-icon></el-button>
        <el-button type="success" circle size="small" title="next month" @click="selectDate('next-month')"
          ><el-icon><arrow-right-bold /></el-icon></el-button
        >
        <el-button type="primary" circle size="small" title="next year" @click="selectDate('next-year')"
          ><el-icon><d-arrow-right /></el-icon></el-button
        >
      </el-button-group>
    </template>
  </el-calendar>
</template>

<script lang="ts">
import { ref,defineComponent } from 'vue'

export default defineComponent({

setup(){
const value = ref(new Date())
const calendar = ref(null)
const selectDate = (val: string) => {
  (calendar as any).value.selectDate(val)
}
return {
  value,
  calendar,
  selectDate
}
}
})
</script>