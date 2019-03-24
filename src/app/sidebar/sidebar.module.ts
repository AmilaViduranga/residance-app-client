import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { BasicAuthService } from '../services/basic-auth.service';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComponent ],
    providers:[BasicAuthService],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
