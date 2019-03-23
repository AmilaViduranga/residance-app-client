import { Component, OnInit } from '@angular/core';
import { BasicRestService } from '../../services/basic-rest.service';
import { environment } from '../../../environments/environment';
import { Role } from '../../residance-models/role.model';
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
  constructor(private service: BasicRestService) { 
    this.newRoleInstance.name = "test";
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
      })
    }, err => {
      console.log(err);
    })
  }

  addMenus(role: Role, menuField:string) {
    if(menuField != "") {
      role.menus.push(menuField);
    }
  }

  removeMenus(role: Role, index: number) {
    role.menus.splice(index, 1);
  }

  saveRole() {

    this.service.post(environment.BASESERVICE + environment.ROLE_CREATE, true, this.newRoleInstance).subscribe(response => {
      if(response.status == 200) {
        swal("Created Successfully", "your role has created", "success");
        this.getRoles();
      }
    }, err => {
      swal("Error", "your role has not created", "warning");
    })
  }


  loadUpdateRole(updatableRole: Role) {
    this.updateMenu = "";
    this.updateRoleInstance = updatableRole;
    $('#updateModal').modal('show');
  }

  updateRole() {
    this.service.put(environment.BASESERVICE + environment.ROLE_UPDATE + this.updateRoleInstance._id, true, this.updateRoleInstance).subscribe(response => {
      if(response.status == 200) {
        swal("Updated role", "your role has updated", "success");
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

  selectAllCrud(){
    alert("efef")
  }

} 
