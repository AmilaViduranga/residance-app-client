import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { BasicAuthService } from '../../services/basic-auth.service';
import { Statics } from 'src/app/services/statics';

@Component({
  selector: 'app-residance-dashboard',
  templateUrl: './residance-dashboard.component.html',
  styleUrls: ['./residance-dashboard.component.css']
})
export class ResidanceDashboardComponent implements OnInit {
  public menuItems: any[];

  isGasBillAllow:boolean = false;
  isTenantAllow:boolean = false;
  isRoleAllow:boolean = false;
  isUnitAllow:boolean = false;
  isUserAllow: boolean = false;
  constructor(private auth: BasicAuthService) { }

  ngOnInit() {
    this.authUserMenus();
  }

  authUserMenus() {
    let role = this.auth.getRoleName();
    ROUTES.forEach(route => {
      route.allow = false;
      route.grants.forEach(grantRole => {
          if(grantRole == role) {
              route.allow = true;
              switch(route.name) {
                case Statics.GAS_BILL: {
                  this.isGasBillAllow = true;
                  break;
                }
                case Statics.TENANT: {
                  this.isTenantAllow = true;
                  break;
                }
                case Statics.ROLE: {
                  this.isRoleAllow = true;
                  break;
                }
                case Statics.UNIT: {
                  this.isUnitAllow = true;
                  break;
                }
                case Statics.USER: {
                  this.isUserAllow = true;
                  break;
                }
              }
          }
      })
    })
  }

}
