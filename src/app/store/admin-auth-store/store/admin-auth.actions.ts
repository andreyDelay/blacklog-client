import {createAction, props} from "@ngrx/store";
import {AuthData} from "./admin-auth.reducer";

export const login = createAction(
  '[Admin Auth] login',
  props<{login: string, password: string}>()
);

export const LoginSuccess = createAction(
  '[Admin Auth] login success',
  props<{authData: AuthData }>()
);

export const LoginFailed = createAction(
  '[Admin Auth] login failed',
  props<{serverError: string}>()
);

export const initAdminAuth = createAction(
  '[Admin auth] init admin auth'
);

export const logoutSuccess = createAction(
  '[Admin auth] logout success'
);

export const extractLoginData = createAction(
  '[Admin auth] extract login data'
);
