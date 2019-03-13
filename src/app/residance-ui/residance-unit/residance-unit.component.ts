import { Component, OnInit } from '@angular/core';
import { Unit } from '../../residance-models/units.model';
import { Tenant } from '../../residance-models/tenant.model';
import { environment } from '../../../environments/environment';
import { BasicRestService } from '../../services/basic-rest.service';
import { Statics } from '../../services/statics';
import swal from 'sweetalert2';
declare var $ :any;

@Component({
  selector: 'app-residance-unit',
  templateUrl: './residance-unit.component.html',
  styleUrls: ['./residance-unit.component.css']
})
export class ResidanceUnitComponent implements OnInit {

  availableUnits:Array<Unit> = new Array<Unit>();
  availableTenant:Array<Tenant> = new Array<Tenant>();
  newUnit: Unit = new Unit();
  updateUnit: Unit = new Unit();

  constructor(private service: BasicRestService) { }

  ngOnInit() {
    this.getAvailableUnits();
    this.getAllTenants();
    this.newUnit.PublishedBy = Statics.userId;
  }

  getAvailableUnits() {
    this.availableUnits = [];
    this.service.get(environment.BASESERVICE + environment.UNIT_GET_ALL, true).subscribe(units => {
      units.data.forEach(unit => {
        let newUnit = new Unit();
        newUnit._id = unit._id;
        newUnit.unit_identifier = unit.unit_identifier;
        newUnit.floor = unit.floor;
        newUnit.name = unit.name;
        newUnit.tenant_id = unit.tenant_id._id;
        newUnit.tenant = unit.tenant_id;
        this.availableUnits.push(newUnit);
      })
    }, err => {
      console.log(err);
    })
  }

  getAllTenants() {
    this.service.get(environment.BASESERVICE + environment.TENANT_GET_ALL, true).subscribe(tenants => {
      tenants.data.forEach(tenant => {
        let newTenant = new Tenant();
        newTenant._id = tenant._id;
        newTenant.name = tenant.name;
        this.availableTenant.push(newTenant);
      })
    }, err => {
      console.log(err);
    })
  }

  loadUpdateUnit(unit: Unit) {
    this.updateUnit = unit;
    $("#updateModal").modal("show");
  }

  saveUnit() {
    this.service.post(environment.BASESERVICE + environment.UNIT_CREATE, true, this.newUnit).subscribe(response => {
      if(response.status == 200) {
        swal("Created Unit", "your unit has created", "success");
        this.getAvailableUnits();
      }
    }, err => {
      swal("Error", "your unit has not created", "warning");
    })
  }

  unitUpdate() {
    this.service.put(environment.BASESERVICE + environment.UNIT_UPDATE + this.updateUnit._id, true, this.updateUnit).subscribe(response => {
      if(response.status == 200) {
        swal("Unit updated", "your unit has updated", "success");
        this.getAvailableUnits();
      }
    }, err => {
      swal("Error", "your unit has not created", "warning");
    })
  }

  deleteUnit(id) {
    swal({
      title: "Are you sure?",
      text: "You are going to delete this unit?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, It's a mistake!"
    }).then(isConfirmed => {
        if(isConfirmed.value != undefined && isConfirmed.value == true) {
          this.service.delete(environment.BASESERVICE + environment.UNIT_DELETE + id, true).subscribe(response => {
            if(response.status == 200) {
              swal("Unit has deleted", "your unit has deleted", "success");
              this.getAvailableUnits();
            }
          }, err => {
            swal("Error", "your unit has not deleted", "warning");
          })
        }
    })
  }

}
