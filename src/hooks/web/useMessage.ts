import { ElMessage } from 'element-plus'
import type {MessageType} from "@/types/global"

export const useMessage = (msg: string, type: MessageType = 'success') => {
  ElMessage({
    message: msg,
    type: type,
    showClose: true,
    center: true,
    grouping: true,
  })
}

export const useCloser=(type: string,seconds: string | number=1000)=>{
  seconds=typeof seconds==='string'?parseInt(seconds):seconds
  const msg=`博客${type}成功,窗口将在${seconds/1000}s后关闭！`
  useMessage(msg)
  setTimeout(()=>{
    window.close()
  },seconds)
}
