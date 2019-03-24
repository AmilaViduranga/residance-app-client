import { Injectable } from '@angular/core';
import { Statics } from "./statics";

import * as jwt_decode from "jwt-decode";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService {

  constructor() { }

  getUserId() {
    let decoder = jwt_decode(sessionStorage.getItem("token") || Statics.token);
    return decoder._id;
  }

  getRoleName() {
    let decoder = jwt_decode(sessionStorage.getItem("token") || Statics.token);
    return decoder.role.name;
  }

  isGranted(menuName, action) {
    let decorder = jwt_decode(sessionStorage.getItem("token") || Statics.token);
    for(let i=0; i<decorder.role.menus.length; i++) {
      if(decorder.role.menus[i].name == menuName) {
        switch(action){
          case Statics.INSERT: {
            return decorder.role.menus[i].isInsert;
          }
          case Statics.UPDATE: {
            return decorder.role.menus[i].isUpdate;
          }
          case Statics.DELETE: {
            return decorder.role.menus[i].isDelete;
          }
          case Statics.VIEW: {
            return decorder.role.menus[i].isView;
          }
          case Statics.INSERT_ELSE: {
            return decorder.role.menus[i].canInsertOthers;
          }
          case Statics.UPDATE_ELSE: {
            return decorder.role.menus[i].canEditOthers;
          }
          case Statics.DELETE_ELSE: {
            return decorder.role.menus[i].canDeleteOthers;
          }
          case Statics.VIEW_ELSE: {
            return decorder.role.menus[i].canViewOthers;
          }
        }
      }
    }
  }
}
