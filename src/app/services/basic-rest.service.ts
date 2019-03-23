import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Statics } from './statics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicRestService {

  constructor(private http: HttpClient) { }
  
  get(path: any, isAuthorizedRequest: boolean): Observable<any> {
    if(isAuthorizedRequest) {
      return this.http.get(path, {
        headers: {
          "Authorization": Statics.token || sessionStorage.getItem("token")
        }
      })
    } else {
      return this.http.get(path);
    }
  }

  post(path: any, isAuthorizedRequest:boolean, data: any): Observable<any> {
    if(isAuthorizedRequest) {
      return this.http.post(path, data, {
        headers: {
          "Authorization": Statics.token || sessionStorage.getItem("token")
        }
      }) 
    } else {
      return this.http.post(path, data);
    }
  }

  put(path: any, isAuthorizedRequest: boolean, data: any) :Observable<any> {
    if(isAuthorizedRequest) {
      return this.http.put(path, data, {
        headers: {
          "Authorization": Statics.token || sessionStorage.getItem("token")
        }
      }) 
    } else {
      return this.http.put(path, data);
    }
  }

  delete(path:any, isAuthorizedRequest: boolean): Observable<any> {
    if(isAuthorizedRequest) {
      return this.http.delete(path, {
        headers: {
          "Authorization": Statics.token || sessionStorage.getItem("token")
        }
      })
    } else {
      return this.http.delete(path);
    }
  }
}
