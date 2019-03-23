import { Component, OnInit } from '@angular/core';
import { Tenant } from '../../residance-models/tenant.model';
import { environment } from '../../../environments/environment';
import { BasicRestService } from '../../services/basic-rest.service';
import { Statics } from '../../services/statics';
import swal from 'sweetalert2';
declare var $ :any;

@Component({
  selector: 'app-residance-tenants',
  templateUrl: './residance-tenants.component.html',
  styleUrls: ['./residance-tenants.component.css']
})
export class ResidanceTenantsComponent implements OnInit {
  availableTenants:Array<Tenant> = new Array<Tenant>();
  updateInstance:Tenant = new Tenant();
  newInstance:Tenant = new Tenant();
  countries: Array<any> = new Array<any>();

  constructor(private service: BasicRestService) { 
    this.countries = Statics.countries;
  }

  ngOnInit() {
    this.getAvailableTenants();
    this.newInstance.PublishedBy = Statics.userId;
    this.newInstance.admin_user_id = Statics.userId;
  }

  getAvailableTenants() {
    this.availableTenants = [];
    this.service.get(environment.BASESERVICE + environment.TENANT_GET_ALL, true).subscribe(tenants => {
      tenants.data.forEach(tenant => {
        let newTenant = new Tenant();
        newTenant._id = tenant._id;
        newTenant.address_line1 = tenant.address_line1;
        newTenant.address_line2 = tenant.address_line2;
        newTenant.admin_user_id = tenant.admin_user_id._id;
        newTenant.city = tenant.city;
        newTenant.country = tenant.country;
        newTenant.domain = tenant.domain;
        newTenant.latitude = tenant.latitude;
        newTenant.longitude = tenant.longitude;
        newTenant.name = tenant.name;
        newTenant.postal_code = tenant.postal_code;
        newTenant.PublishedBy = tenant.PublishedBy._id;
        this.availableTenants.push(newTenant);
      })
    }, err => {
      console.log(err);
    })
  }

  loadUpdateTenant(tenant: Tenant) {
    debugger
    this.updateInstance = tenant;
    $('#updateModal').modal("show");
  }

  updateTenant() {
    this.service.put(environment.BASESERVICE + environment.TENANT_UPDATE + this.updateInstance._id, true, this.updateInstance).subscribe(response => {
      if(response.status == 200) {
        swal("Updated tenant", "your tenant has updated", "success");
        this.getAvailableTenants();
      }
    }, err => {
      swal("Error", "your role has not updated", "warning");
    })
  }

  insertTenant() {
    this.service.post(environment.BASESERVICE + environment.TENANT_CREATE, true, this.newInstance).subscribe(response => {
      if(response.status == 200) {
        swal("Created tenant", "your tenant has created", "success");
        this.getAvailableTenants();
      }
    }, err => {
      swal("Error", "your role has not created", "warning");
    })
  }

  deleteTenant(id) {
    swal({
      title: "Are you sure?",
      text: "You are going to delete this tenant?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, It's a mistake!"
    }).then(isConfirmed => {
        if(isConfirmed.value != undefined && isConfirmed.value == true) {
          this.service.delete(environment.BASESERVICE + environment.TENANT_DELETE + id, true).subscribe(response => {
            if(response.status == 200) {
              swal("Deleted Tenant", "your tenant has deleted", "success");
              this.getAvailableTenants();
            }
          }, err => {
            swal("Error", "your role has not deleted", "warning");
          })
        }
    })
  }

}
