import { Action } from '@ngrx/store';

export enum SecureActionTypes {
  LOAD_APP_MENU_SUCCESS = 'LOAD APP MENU SUCCESS',
  LOAD_APP_MENU_FAILURE = 'LOAD APP MENU FAILURE',
  LOAD_APP_MENU = 'LOAD APP MENU',
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

export type SecureActions =
  | LoadAppMenu
  | LoadAppMenuFailure
  | LoadAppMenuSuccess;
