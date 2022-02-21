import { httpInstance } from '@/utils/http/index'
import type { ResponseModel } from '@/api/model/userModel'
import type {UpdateBlogType,NewBlogType} from "@/api/model/blogsModel"
enum BlogApi {
  BlogList = 'api/blog/list',
  BlogDetail='api/blog/detail',
  BlogUpdate='api/blog/update',
  BlogNew='api/blog/new',
  DeleteBlog='api/blog/delete',
  AllBlogs='api/blog/all-blogs'
}

let requestParams

export const getBlogList = () => {
  requestParams = {
    url: BlogApi.BlogList,
  }
  return httpInstance.get<ResponseModel>(requestParams)
}

export const getAllBlogs = () => {
  requestParams = {
    url: BlogApi.AllBlogs,
  }
  return httpInstance.get<ResponseModel>(requestParams)
}

export const getBlogDetail = (title: string) => {
  requestParams = {
    url: BlogApi.BlogDetail+`?title=${title}`,
  }
  return httpInstance.get<ResponseModel>(requestParams)
}

export const getDetailById=(contentId: string)=>{
  requestParams={
    url:BlogApi.BlogDetail+`?contentId=${contentId}`
  }
  return httpInstance.get<ResponseModel>(requestParams)
}

export const updateBlogById=(params:UpdateBlogType)=>{
  requestParams={
    url:BlogApi.BlogUpdate,
    data:params
  }
  return httpInstance.post<ResponseModel>(requestParams)
}

export const newBlogApi=(params:NewBlogType)=>{
  requestParams={
    url:BlogApi.BlogNew,
    data:params
  }
  return httpInstance.post<ResponseModel>(requestParams)
}

export const deleteBlogById=(contentId: string)=>{
  requestParams={
    url:BlogApi.DeleteBlog+`?contentId=${contentId}`,
  }
  return httpInstance.delete<ResponseModel>(requestParams)
}