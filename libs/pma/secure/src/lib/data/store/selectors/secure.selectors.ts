import { createFeatureSelector } from "@ngrx/store";

export const selectSecureState = createFeatureSelector<any>('secure');