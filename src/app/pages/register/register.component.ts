import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../residance-models/user.model';
import { Role } from '../../residance-models/role.model';
import { Statics } from '../../services/statics';
import { BasicRestService } from '../../services/basic-rest.service';
import { environment } from '../../../environments/environment';
import swal from 'sweetalert2';

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    newUser:User = new User();
    countries:Array<any> = new Array<any>();
    roles:Array<Role> = new Array<Role>();

    constructor(private service: BasicRestService) {
      this.countries = Statics.countries;
    }

    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      body.classList.add('off-canvas-sidebar');
      this.getRoles();
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
      body.classList.remove('off-canvas-sidebar');
    }

    getRoles() {
      this.service.get(environment.BASESERVICE + environment.ROLE_GET_LIST, false).subscribe(roles => {
        roles.data.forEach(role => {
          let roleInstance = new Role();
          roleInstance._id = role._id;
          roleInstance.name = role.name;
          roleInstance.menus = role.menus;
          this.roles.push(roleInstance);
        })
      })
    }

    register() {
      this.service.post(environment.BASESERVICE + environment.USER_CREATE, false, this.newUser).subscribe(data => {
        if(data.status == 200) {
          swal("Successfully Registered!", "You have registered", "success");
        }
      }, err => {
        swal("Not Registered!", "You have not registered due to error:- " + err, "warning");
      })
    }

    loadProfile(event) {
      var file:File = event.target.files[0];
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.newUser.profile_pic = myReader.result;
      }
      myReader.readAsDataURL(file);
    }
}
