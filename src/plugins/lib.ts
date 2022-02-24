import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})

export default (app: any) => {
  //全局注册图标
  for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
  }
  app.use(ElementPlus)
  app.use(VueMarkdownEditor)
  app.component('mavon-editor', VueMarkdownEditor)
}
