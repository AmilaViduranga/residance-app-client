import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Statics } from '../services/statics';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/residance/residance-dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    }, {
        path: '/residance/residance-gassbill',
        title: 'Gas Bill Management',
        type: 'link',
        icontype: 'games'
    },{
        path: '/residance/residance-role',
        title: 'Role Management',
        type: 'link',
        icontype: 'record_voice_over' 
    }, {
        path: '/residance/residance-tenant',
        title: 'Tenant Management',
        type: 'link',
        icontype: 'perm_identity'
    },{
        path: '/residance/residance-unit',
        title: 'unit Management',
        type: 'link',
        icontype: 'assessment'
    }, {
        path: '/residance/residance-user',
        title: 'User Management',
        type: 'link',
        icontype: 'supervised_user_circle'
    }

];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public userName:string;

    constructor(private route: Router) {

    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.userName = Statics.userName;
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    logout() {
        swal({
            title: "Are you sure?",
            text: "You are going to leave?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, logout",
            cancelButtonText: "No, It's a mistake!"
          }).then(isConfirmed => {
              if(isConfirmed.value != undefined && isConfirmed.value == true) {
                  Statics.token = "";
                  sessionStorage.clear();
                  Statics.userName = "";
                  this.route.navigateByUrl('/pages/login');
              }
          })
    }
}
