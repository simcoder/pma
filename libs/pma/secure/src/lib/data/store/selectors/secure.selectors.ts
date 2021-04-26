import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectSecureState = createFeatureSelector<any>('secure');
export const selectUser = createSelector(selectSecureState, state =>{
    return state ? state.user: null;
})