<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item timestamp="2022/01/27"
                        center
                        color="hsl"
                        placement="top">
        <el-card>

          <el-link @click="handleContent">
            <h2 class="post-title">{{title}}</h2>
            <p class="time-commited">Tom committed 2022/01/27 20:46</p>
            <p>概述Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。Promise对象有以下两个特点。 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操...</p>
          </el-link>
          <a href=""
             class="tag">
            <el-tag class="ml-2"
                    type="info"
                    label="Promise"
                    title="Promise"
                    effect='plain'>Promise</el-tag>
          </a>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3"
                        center
                        placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2"
                        center
                        placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2"
                        center
                        placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2"
                        center
                        placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { openWindow } from "@/utils/index";
import { buildShortUUID } from "@/utils/uuid";
export default defineComponent({
  name: "Content",
  setup(props) {
    console.log(props);
    const title = ref("Promise概述");
    const contentId = buildShortUUID();
    function handleContent() {
      console.log("contentId", contentId);
      openWindow(`/#/article/${contentId}`);
    }
    return {
      handleContent,
      title
    };
  }
});
</script>

<style lang="less" scoped>
el-card {
  background-color: skyblue;
}
/* 未访问的链接 */
a:link {
  color: wheat;
}

/* 已访问的链接 */
a:visited {
  color: skyblue;
}

/* 鼠标悬停链接 */
a:hover {
  color: wheat;
}

/* 已选择的链接 */
a:active {
  color: lightgreen;
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
  float: left;
  margin: 10px auto;
}
</style>
