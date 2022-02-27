import { ElLoading } from 'element-plus'
//开启加载
export const useOpenLoading = (flag: boolean) => {
  return ElLoading.service({
    lock: flag,
    // text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

//关闭加载
export const useCloseLoading=(loadingInstance: any)=>{
  loadingInstance.close()
  loadingInstance=null
}
