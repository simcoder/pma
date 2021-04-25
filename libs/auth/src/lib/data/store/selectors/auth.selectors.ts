import { createFeatureSelector } from "@ngrx/store";

export const selectAuthState = createFeatureSelector<any>('auth');