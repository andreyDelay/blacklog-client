import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {getAccessToken} from "../store/admin-auth.selectors";
import {catchError, first} from "rxjs/operators";
import {flatMap} from "rxjs/internal/operators";

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

  constructor(
    private store$: Store
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
      select(getAccessToken),
      first(),
      flatMap(token => {
        const authRequest = token ? request.clone({
          setHeaders: {
            Authorization: `Bearer_${token}`
          }
        }) : request;
        return next.handle(authRequest).pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401 || err.status === 403) {
                console.log('redirect on login page');
                return EMPTY;
              }
            }
            throw err;
          })
        );
      })
    );
  }
}
