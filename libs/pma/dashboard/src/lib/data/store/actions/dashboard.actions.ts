import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
  LOAD_TENTANT_SUCESS = 'LOAD_TENTANT_SUCESS',
  LOAD_TENTANT_FAILURE = 'LOAD_TENTANT_FAILURE',
  LOAD_TENTANT = 'LOAD_TENTANT',
}
export class LoadTenantSuccess implements Action {
  readonly type = DashboardActionTypes.LOAD_TENTANT_SUCESS;
  constructor(public payload: any) {}
}

export class LoadTenantFailure implements Action {
  readonly type = DashboardActionTypes.LOAD_TENTANT_FAILURE;
}

export class LoadTenant implements Action {
  readonly type = DashboardActionTypes.LOAD_TENTANT;
}
export type DashboardActions =
  | LoadTenant
  | LoadTenantFailure
  | LoadTenantSuccess;
