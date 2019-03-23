import { Injectable } from '@angular/core';
import { Statics } from "./statics";

import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  token:string = Statics.token || sessionStorage.getItem("token");

  constructor() { }

  getUserId() {
    let decoder = this.decodeToken();
    return decoder._id;
  }

  private decodeToken() {
    return jwt_decode(this.token);
  }

}
