import { httpInstance } from '@/utils/http/index'
import { GetSuperAdministratorModel, DelAdministratorModel,LoginModel,RegisterModel} from '@/api/model/userModel'
import type { UserAdministrator } from "@/types/utils"
import type {LoginInfo,RegisterType} from "@/types/user"

enum UserApi {
  GetSuperAdministrator = 'ids/manager/auth/super_administrator',
  GetUserLogin='api/user/login',
  UserRegister='api/user/register'
}

let requestParams

export const getSuperAdministrators = () => {
  requestParams={
    url: UserApi.GetSuperAdministrator,
  }
  return httpInstance.get<GetSuperAdministratorModel>(requestParams)
}

export const insertSuperAdministrator = (params: UserAdministrator) => {
   requestParams = {
    url: UserApi.GetSuperAdministrator,
    data: params,
  }
  return httpInstance.post<GetSuperAdministratorModel>(requestParams)
}

export const deleteSuperAdministrator = (id: string) => {
   requestParams = {
    url: UserApi.GetSuperAdministrator + `/${id}`,
  }
  return httpInstance.delete<DelAdministratorModel>(requestParams)
}

export const login=(params: LoginInfo)=>{
   requestParams={
    url:UserApi.GetUserLogin,
    data:params
  }
  return httpInstance.post<LoginModel>(requestParams)
}

export const register=(params:RegisterType)=>{
  requestParams={
    url:UserApi.UserRegister,
    data:params
  }
  return httpInstance.post<RegisterModel>(requestParams)
}
