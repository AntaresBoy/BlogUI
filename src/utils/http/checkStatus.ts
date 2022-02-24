import type {MessageType} from "@/types/global"
import {useMessage} from "@/hooks/web/useMessage"
import router from '@/router';

export const checkStatus=(
  status: number,
  msg: string,
  errorMessageMode: MessageType = 'error',
)=> {
  let errMessage = '';
  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
      // 401: 未登录,则跳转到登录页面，并携带当前页面的路径,成功登录后返回当前页面。 这一步需要在登录页面操作。
    case 401:
      //设置token
      // userStore.setToken(undefined);
      router.push('/login')
      errMessage = msg 
      break;
    case 403:
      // errMessage = t('sys.api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      errMessage = `404${msg}`
      errorMessageMode='info'
      break;
    case 405:
      errMessage = "405"
      break;
    case 408:
      errMessage ="408"
      break;
    case 500:
      errMessage = "500"
      break;
    case 501:
      errMessage = "501"
      break;
    case 502:
      errMessage ="502"
      break;
    case 503:
      errMessage = "503"
      break;
    case 504:
      errMessage = ""
      break;
    case 505:
      errMessage = "504"
      break;
    default:
  }
  if (errMessage) {
    useMessage(errMessage,errorMessageMode)
  }
}

