import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  extractLoginData,
  initAdminAuth,
  login,
  LoginFailed,
  LoginSuccess,
  logout,
  logoutSuccess
} from "./admin-auth.actions";
import {catchError, distinctUntilChanged, filter, first, map, skip, switchMap, tap} from 'rxjs/operators';
import {AdminAuthService} from "../services/admin-auth.service";
import {fromEvent, of, timer} from "rxjs";
import {AuthData} from "./admin-auth.reducer";
import {getAuthData, isAuth} from "./admin-auth.selectors";
import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";

@Injectable()
export class AdminAuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => this.adminAuthService.login({
      login: action.login,
      password: action.password
    }).pipe(
      map(authData => LoginSuccess({authData})),
      catchError(
        error => of(LoginFailed({
            serverError: error.message
          }))
      )
    ))
  ));

  refresh$ = createEffect(() => this.actions$.pipe(
    ofType(LoginSuccess),
    switchMap(
      action => timer(
        action.authData.exp * 1000 - 7200000 - Date.now()
      )
    ),
    switchMap(() => this.store$.pipe(
      select(isAuth),
      first(),
      filter(isAdminAuth => isAdminAuth)
    )),
    switchMap(() => this.adminAuthService.refresh()),
    map(authData => LoginSuccess({authData}))
  ));

  saveAuthDataToLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(LoginSuccess),
    tap(({authData}) => {
      localStorage.setItem('authData', JSON.stringify(authData));
    })
  ), {dispatch: false});

  extractLoginData$ = createEffect(() => this.actions$.pipe(
    ofType(initAdminAuth, extractLoginData),
    map(() => {
      const authDataString = localStorage.getItem('authData');
      if (!authDataString) {
        return logoutSuccess();
      }

      const authData: AuthData = JSON.parse(authDataString);

      if ((authData.exp * 1000 - 3600000 - Date.now()) < 0) {
        return logoutSuccess();
      }

      return LoginSuccess({authData});
    })
  ));

  listenStorageEffect$ = createEffect(() => this.actions$.pipe(
    ofType(initAdminAuth),
    switchMap(() => fromEvent(window, 'storage')),
    map(() => extractLoginData())
  ));

  listenAuthorizeEffect$ = createEffect(() => this.actions$.pipe(
    ofType(initAdminAuth),
    switchMap(() => this.adminAuthService.isAuth$),
    distinctUntilChanged(),
    skip(1),
    tap(isAuthorized => {
      this.router.navigateByUrl(
        isAuthorized ? '/admin' : '/admin/auth/login'
      );
    })
  ), {dispatch: false});

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    map(() => {
      localStorage.removeItem('authData');
      return logoutSuccess();
    })
  ));

  constructor(
    private actions$: Actions,
    private adminAuthService: AdminAuthService,
    private store$: Store,
    private router: Router) {
  }
}
