import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as adminAuth from "../../../../store/admin-auth-store/store/admin-auth.selectors";
import {login} from "../../../../store/admin-auth-store/store/admin-auth.actions";
import {HttpClient, HttpEvent, HttpEventType, HttpHeaderResponse} from "@angular/common/http";
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-admin-login-block',
  templateUrl: './admin-login-block.component.html',
  styleUrls: ['./admin-login-block.component.scss']
})
export class AdminLoginBlockComponent implements OnInit {

  loading$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoading));
  loaded$: Observable<boolean> = this.store$.pipe(select(adminAuth.getLoaded));
  serverError$: Observable<string> = this.store$.pipe(select(adminAuth.getServerError));

  serverError = '';
  private filename: string;

  constructor(private store$: Store, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onLogin(loginPayload: {login:string, password: string}) {
    this.store$.dispatch(login(loginPayload));
  }

  downloadFile() : Observable<HttpEvent<Blob>> {
    return this.httpClient.get('http://127.0.0.1:8080/api/v1/excel/download/basetp', {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  testProfile() {
    this.downloadFile().subscribe(
      event => {
        this.resolveEvent(event);
    })
  }

  private resolveEvent(httpEvent: HttpEvent<Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.ResponseHeader:
        this.filename = this.fetchFilenameFromHeader(httpEvent);
        break;
      case HttpEventType.Response:
        fileSaver.saveAs(new File([httpEvent.body!], this.filename,
          {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        break;
    }
  }

  private fetchFilenameFromHeader(responseHeaderHttpEvent: HttpHeaderResponse): string {
    return responseHeaderHttpEvent.headers.get('Content-Disposition') // 'attachment; filename=response.xlsx'
      .split(';')[1] // 'filename=response.xlsx'
      .split('=')[1]; // 'response.xlsx'
  }

}
