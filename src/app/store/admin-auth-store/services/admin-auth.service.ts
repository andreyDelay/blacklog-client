import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {AuthData} from "../store/admin-auth.reducer";
import {select, Store} from "@ngrx/store";
import {getAuthData} from "../store/admin-auth.selectors";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  isAuth$ = this.store$.pipe(
    select(getAuthData),
    filter(authData => authData !== undefined),
    map(authData => !!authData)
  );

  isGuest$ = this.isAuth$.pipe(
    map(authData => !authData)
  );

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService,
    private store$: Store
    ) { }

  login(body: {login:string, password: string}): Observable<AuthData> {
    return this.httpClient.post<{accessToken: string}>(
      environment.apiUrl + 'auth/login',
      body
    ).pipe(
      map(res => ({
        ...res,
        ...this.jwtHelperService.decodeToken(res.accessToken)
      }))
    );
  }

  refresh(): Observable<AuthData> {
    return this.httpClient.post<{accessToken: string}>(
      environment.apiUrl + 'auth/refresh',
      {}
    ).pipe(
      map(res => ({
        ...res,
        ...this.jwtHelperService.decodeToken(res.accessToken)
      }))
    );
  }
}
