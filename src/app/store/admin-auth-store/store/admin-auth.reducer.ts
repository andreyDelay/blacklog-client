import {createReducer, on} from "@ngrx/store";
import {login, LoginFailed, LoginSuccess, logoutSuccess} from "./admin-auth.actions";

export const ADMIN_AUTH_FEATURE_NAME = 'admin-auth';

export interface AuthData {
  accessToken: string;
  sub: string;
  roles: [];
  iat: number;
  exp: number;
}

export interface AdminAuthState {
  loading: boolean;
  loaded: boolean;
  serverError: string;
  authData?: AuthData;
}

const initialState: AdminAuthState = {
  loaded: true,
  loading: false,
  serverError: ''
};

export const adminAuthReducer = createReducer(
  initialState,
  on(login, state => ({
    ...state,
    loading: true,
    serverError: ''
  })),
  on(LoginSuccess, (state, {authData}) => ({
    ...state,
    authData,
    loaded: true,
    loading: false
  })),
  on(LoginFailed, (state, {serverError}) => ({
    ...state,
    authData: null,
    loaded: true,
    loading: false,
    serverError
  })),
  on(logoutSuccess, () => ({
    ...initialState,
    authData: null
  }))
);
