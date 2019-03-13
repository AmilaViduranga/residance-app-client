import { Routes } from '@angular/router';
import { ResidanceDashboardComponent } from './residance-dashboard/residance-dashboard.component';
import { ResidanceGasbilComponent } from './residance-gasbil/residance-gasbil.component';
import { ResidanceRoleComponent } from './residance-role/residance-role.component';
import { ResidanceTenantsComponent } from './residance-tenants/residance-tenants.component';
import { ResidanceUnitComponent } from './residance-unit/residance-unit.component';
import { ResidanceUserComponent } from './residance-user/residance-user.component';

export const ResidanceRoutes: Routes = [
    {
      path: '',
      children: [ {
            path: 'residance-dashboard',
            component: ResidanceDashboardComponent
      }, {
            path: 'residance-gassbill',
            component: ResidanceGasbilComponent
      }, { 
          path: 'residance-role',
          component: ResidanceRoleComponent
      }, {
          path: 'residance-tenant',
          component: ResidanceTenantsComponent
      }, {
          path: 'residance-unit',
          component: ResidanceUnitComponent
      }, {
          path: 'residance-user',
          component: ResidanceUserComponent
      }]
}
];