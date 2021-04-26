import { Action } from '@ngrx/store';

export enum SecureActionTypes {
  LOAD_APP_MENU_SUCCESS = 'LOAD APP MENU SUCCESS',
  LOAD_APP_MENU_FAILURE = 'LOAD APP MENU FAILURE',
  LOAD_APP_MENU = 'LOAD APP MENU',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_TENANT_SUCCESS = 'UPDATE_TENANT_SUCCESS',
  UPDATE_TENANT_FAILURE = 'UPDATE_TENANT_FAILURE',
  UPDATE_TENANT = 'UPDATE_TENANT',
  LINK_TENANT_WITH_USER = 'LINK TENANT WITH USER'
}
export class LoadAppMenuSuccess implements Action {
  readonly type = SecureActionTypes.LOAD_APP_MENU_SUCCESS;
  constructor(public payload: any) {}
}
export class LoadAppMenuFailure implements Action {
  readonly type = SecureActionTypes.LOAD_APP_MENU_FAILURE;
}

export class LoadAppMenu implements Action {
  readonly type = SecureActionTypes.LOAD_APP_MENU;
}

export class UpdateUser implements Action {
  readonly type = SecureActionTypes.UPDATE_USER;
  constructor(public uuid: string, public updatedUser: any) {}
}
export class UpdateUserSuccess implements Action {
  readonly type = SecureActionTypes.UPDATE_USER_SUCCESS;
  constructor(public user: any) {}
}
export class UpdateUserFailure implements Action {
  readonly type = SecureActionTypes.UPDATE_USER_FAILURE;
}

export class UpdateTenant implements Action {
  readonly type = SecureActionTypes.UPDATE_TENANT;
  constructor(public id: string, public updatedTenant: any) {}
}
export class UpdateTenantSuccess implements Action {
  readonly type = SecureActionTypes.UPDATE_TENANT_SUCCESS;
}
export class UpdateTenantFailure implements Action {
  readonly type = SecureActionTypes.UPDATE_TENANT_FAILURE;
}

export class LinkTenantWithUser implements Action {
  readonly type = SecureActionTypes.LINK_TENANT_WITH_USER;
  constructor(public uid: string, public updatedUser:any, public tenantId:string) {}
}
export type SecureActions =
  | LoadAppMenu
  | LoadAppMenuFailure
  | LoadAppMenuSuccess
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFailure
  | LinkTenantWithUser
  | UpdateTenantFailure
  | UpdateTenantSuccess
  | UpdateTenant;
