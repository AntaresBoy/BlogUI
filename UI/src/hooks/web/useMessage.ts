import { ElMessage } from 'element-plus'
import type {MessageType} from "@/types/global"

export const useMessage = (msg: string, type: MessageType = 'info') => {
  ElMessage({
    message: msg,
    type: type,
    showClose: true,
    center: true,
    grouping: true,
  })
}
