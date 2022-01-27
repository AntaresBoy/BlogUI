import { httpInstance } from '@/utils/http/index'
import type { ResponseModel } from '@/api/model/userModel'
enum BlogApi {
  BlogList = 'api/blog/list',
  BlogDetail='api/blog/detail'
}

let requestParams

export const getBlogList = () => {
  requestParams = {
    url: BlogApi.BlogList,
  }
  return httpInstance.get<ResponseModel>(requestParams)
}

export const getBlogDetail = (title: string) => {
  requestParams = {
    url: BlogApi.BlogDetail+`?title=${title}`,
  }
  return httpInstance.get<ResponseModel>(requestParams)
}
