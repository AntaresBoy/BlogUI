export interface GetSuperAdministratorModel {
  code: number
  msg: string
  data: SuperAdministratorModel[]
}

export interface SuperAdministratorModel {
  id: string
  user: string
}

export interface DelAdministratorModel {
  id: string
  msg: string
  data: string
}

export interface LoginModel {
  data: ResponseModel
  status: number | string
  statusText: string
}

export type RegisterModel = LoginModel

export interface ResponseModel {
  status: number | string
  statusText: string
  data: {
    data: []
    errno: number
  }
}
