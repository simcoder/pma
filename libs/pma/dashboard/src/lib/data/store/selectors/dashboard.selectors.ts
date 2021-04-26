import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectDashboardState = createFeatureSelector<any>('dashboard');
export const selectTenant = createSelector(selectDashboardState, (state) => {
  return state ? state.tenant : null;
});
