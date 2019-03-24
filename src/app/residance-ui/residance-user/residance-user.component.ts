import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { User } from '../../residance-models/user.model';
import { BasicRestService } from '../../services/basic-rest.service';
import { environment } from '../../../environments/environment';
import { Role } from '../../residance-models/role.model';
import swal from 'sweetalert2';
@Component({
  selector: 'app-residance-user',
  templateUrl: './residance-user.component.html',
  styleUrls: ['./residance-user.component.css']
})
export class ResidanceUserComponent implements OnInit {
 
availableuser:Array<User>
newInstance:User = new User();
availableRoles:Array<Role>

  constructor(private service: BasicRestService,private validationService :ValidationService) { 
    // this.availableGasBill = [{account_id:"0101010"}]


  }

  
  ngOnInit() {
    this.getAvailableUsers()
    this.getAvailableRoles()
  }

getAvailableUsers(){
  this.availableuser = [];
  this.service.get(environment.BASESERVICE +environment.USER_GET_ALL,true).subscribe(response=>{
response.data.forEach(userdate => {
  let newUser = new User();
  newUser._id=userdate._id;
  newUser.first_name = userdate.first_name;
  newUser.country = userdate.country;
  newUser.nic = userdate.nic;
  newUser.mobile = userdate.mobile;

  this.availableuser.push(newUser)
});
  },
  err => {
    console.log(err);
  })
}

getAvailableRoles(){
  this.availableRoles = []
  this.service.get(environment.BASESERVICE +environment.ROLE_GET_ALL,true).subscribe(response=>{
debugger
    response.data.forEach(roledate => {
      let newRole = new Role()
      newRole.name = roledate.name;
      newRole._id = roledate._id;
      this.availableRoles.push(newRole)
    })
  },
err => {
  console.log(err);
})

}

validateInputs(){
  let inputarr =[]
  inputarr = [{name:"phone",value1:this.newInstance.mobile,value:""}]
if(this.validationService.mainValidate(inputarr)){
  swal("OK","Clear ","success")
}
else{
  swal("OK","not OK ","error")
}

}
saveUser(){
  this.service.post(environment.BASESERVICE + environment.USER_CREATE,true,this.newInstance).subscribe(response=>{
if(response.status==200){
  swal("User Created Successfully", "New User has created", "success");
  this.getAvailableUsers();

}

  },
err=>{
  swal("Error", "New User has not created", "warning");
   
})
}


 }

