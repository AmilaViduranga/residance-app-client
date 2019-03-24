import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResidanceUtilsModule } from './residance-utils/residance-utils.module';
import { CalendarModule } from '../calendar/calendar.module';
import { ResidanceDashboardComponent } from './residance-dashboard/residance-dashboard.component';
import { ResidanceUserComponent } from './residance-user/residance-user.component';
import { ResidanceRoleComponent } from './residance-role/residance-role.component';
import { ResidanceUnitComponent } from './residance-unit/residance-unit.component';
import { ResidanceTenantsComponent } from './residance-tenants/residance-tenants.component';
import { ResidanceGasbilComponent } from './residance-gasbil/residance-gasbil.component';
import {ValidationService} from '../services/validation.service';
import { ResidanceRoutes } from './residance.routing';
import { BasicAuthService } from '../services/basic-auth.service'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResidanceDashboardComponent, 
    ResidanceUserComponent, 
    ResidanceRoleComponent, 
    ResidanceUnitComponent, 
    ResidanceTenantsComponent, 
    ResidanceGasbilComponent
  ],
  imports: [
    CommonModule,
    ResidanceUtilsModule,
    RouterModule.forChild(ResidanceRoutes),
    FormsModule,
    CalendarModule,
    ReactiveFormsModule
  ],
  providers:[
    ValidationService,
    BasicAuthService
  ]
})
export class ResidanceUiModule { }
