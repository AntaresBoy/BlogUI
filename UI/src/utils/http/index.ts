
import { VAxios } from './axios'
import type { AxiosResponse } from 'axios'
import { deepMerge } from '@/utils/index'
import { ContentTypeEnum } from "@/config/enums/httpEnums"
import { TIME_OUT } from "@/config/const/setting"
import type { CreateAxiosOptions } from "./axiosTransform"
import {checkStatus} from './checkStatus'

class AxiosCreator {

  public createAxios(opt?: Partial<CreateAxiosOptions>) {
    return new VAxios(
      deepMerge({
        authenticationScheme: '',
        timeout: TIME_OUT,
        // 基础接口地址
        // baseURL: getBaseUrl(),
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: this.getTransform(),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // // 接口地址
          // apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          // urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
        opt || {},
      )
    );
  }

  private getTransform() {
    return {
      // 响应拦截器处理
      responseInterceptors: (res: AxiosResponse<any>) => {
        return res;
      },
      //响应错误处理
      responseInterceptorsCatch(error: any){
        const { response, code, message, config } = error || {};
        console.log("responseInterceptorsCatch",error,message,config)
        const msg: string = response?.data?.error?.message ?? '';
        const err: string = error?.toString?.() ?? '';
        checkStatus(error?.response?.status, msg);
        return Promise.reject(error);
      }
    }
  }
}
export const httpInstance = new AxiosCreator().createAxios()

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });


