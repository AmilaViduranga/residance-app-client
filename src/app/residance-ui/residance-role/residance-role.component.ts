import { Component, OnInit } from '@angular/core';
import { BasicRestService } from '../../services/basic-rest.service';
import { environment } from '../../../environments/environment';
import { Role } from '../../residance-models/role.model';
import { Menu } from '../../residance-models/role.model';
import { Statics } from '../../services/statics';
import swal from 'sweetalert2';
declare var $ :any;

@Component({
  selector: 'app-residance-role',
  templateUrl: './residance-role.component.html',
  styleUrls: ['./residance-role.component.css']
})
export class ResidanceRoleComponent implements OnInit {
  newMenu:string = "";
  updateMenu:string = "";
  availableRoles:Array<Role> = new Array<Role>();
  newRoleInstance: Role = new Role();
  updateRoleInstance:Role = new Role();
  menuList: any[] = Statics.menus;
  nameDissabled:any = false;

  SUPER_ADMIN:string = Statics.SUPER_ADMIN;
  ADMIN:string = Statics.ADMIN;
  BASIC_USER:string = Statics.BASIC_USER;

  constructor(private service: BasicRestService) { 
    console.log(this.SUPER_ADMIN);
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.availableRoles = [];
    this.service.get(environment.BASESERVICE + environment.ROLE_GET_ALL, true).subscribe(roles => {
      roles.data.forEach(role => {
        let newRole = new Role();
        newRole._id = role._id;
        newRole.menus = role.menus;
        newRole.name = role.name;
        this.availableRoles.push(newRole);
      });
    }, err => {
      console.log(err);
    })
  }

  addMenus(role: Role, menuField:string) {
    if(menuField != "" && this.checkMenuIsThere(role, menuField)) {
      let newMenu = new Menu();
      newMenu.name = menuField; 
      role.menus.push(newMenu);
    }
  }

  private checkMenuIsThere(role: Role, menuField:string) {
    for(let i=0; i<role.menus.length; i++) {
      if(role.menus[i].name == menuField) {
        return false;
      }
    }
    return true;
  }

  removeMenus(role: Role, index: number) {
    role.menus.splice(index, 1);
  }

  saveRole() {
    this.service.post(environment.BASESERVICE + environment.ROLE_CREATE, true, this.newRoleInstance).subscribe(response => {
      if(response.status == 200) {
        swal("Created Successfully", "your role has created", "success");
        this.newMenu = "not-selected";
        this.getRoles();
      }
    }, err => {
      swal("Error", "your role has not created", "warning");
    })
  }

  loadUpdateRole(updatableRole: Role) {
    this.updateMenu = "";
    this.updateRoleInstance = updatableRole;
    if(updatableRole.name == Statics.SUPER_ADMIN || updatableRole.name == Statics.ADMIN || updatableRole.name == Statics.BASIC_USER) {
      this.nameDissabled = true;
    } else {
      this.nameDissabled = false;
    }
    $('#updateModal').modal('show');
  }

  updateRole() {
    this.service.put(environment.BASESERVICE + environment.ROLE_UPDATE + this.updateRoleInstance._id, true, this.updateRoleInstance).subscribe(response => {
      if(response.status == 200) {
        swal("Updated role", "your role has updated", "success");
        this.updateMenu = "not-selected";
        this.getRoles();
      }
    }, err => {
      swal("Error", "your role has not updated", "warning");
    })
  }

  deleteRole(id) {
    swal({
      title: "Are you sure?",
      text: "You are going to delete this role?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, It's a mistake!"
    }).then(isConfirmed => {
        if(isConfirmed.value != undefined && isConfirmed.value == true) {
          this.service.delete(environment.BASESERVICE + environment.ROLE_DELETE + id, true).subscribe(response => {
            if(response.status == 200) {
              swal("Deleted role", "your role has deleted", "success");
              this.getRoles();
            }
          }, err => {
            swal("Error", "your role has not deleted", "warning");
          })
        }
    })
  }

  selectAllCrud(roleInstance: Role,  index:number, event: any){
    roleInstance.menus[index].isDelete = event.target.checked;
    roleInstance.menus[index].isInsert = event.target.checked;
    roleInstance.menus[index].isUpdate = event.target.checked;
    roleInstance.menus[index].isView = event.target.checked;
    roleInstance.menus[index].canEditOthers = event.target.checked;
    roleInstance.menus[index].canViewOthers = event.target.checked;
    roleInstance.menus[index].canInsertOthers = event.target.checked;
    roleInstance.menus[index].canDeleteOthers = event.target.checked;
  }
} 
