import { Component, OnInit } from '@angular/core';
import { BasicRestService } from '../../services/basic-rest.service';
import { environment } from '../../../environments/environment';
import { GasBill } from '../../residance-models/gasbill.model';
import { Unit } from '../../residance-models/units.model';
import swal from 'sweetalert2';
import { Statics } from 'src/app/services/statics';
declare var $ :any;

@Component({
  selector: 'app-residance-gasbil',
  templateUrl: './residance-gasbil.component.html',
  styleUrls: ['./residance-gasbil.component.css']
})
export class ResidanceGasbilComponent implements OnInit {
  availableGasBill:Array<GasBill> = new Array<GasBill>();
  availableUnits:Array<Unit> = new Array<Unit>();
  newInstance:GasBill = new GasBill();
  updateInstance:GasBill = new GasBill();

  constructor(private service: BasicRestService) { }

  ngOnInit() {
    this.getAvailableGasBills();
    this.getAvailableUnits();
    this.newInstance.publishedBy = Statics.userId;
  }

  getAvailableGasBills() {
    this.availableGasBill = [];
    this.service.get(environment.BASESERVICE + environment.GAS_BILL_GET_ALL, true).subscribe(response => {
      response.data.forEach(gasbill => {
        let newGasBill = new GasBill();
        newGasBill._id = gasbill._id;
        newGasBill.account_id = gasbill.account_id;
        newGasBill.amount = gasbill.amount;
        newGasBill.bill_date = this.dateSpliter(gasbill.bill_date);
        newGasBill.due_date = this.dateSpliter(gasbill.due_date);
        newGasBill.message = gasbill.message;
        newGasBill.outstanding = gasbill.outstanding;
        newGasBill.publishedBy = gasbill.publishedBy;
        newGasBill.unit = gasbill.unit_id;
        newGasBill.unit_id = gasbill.unit_id._id;
        newGasBill.usage = gasbill.usage;
        this.availableGasBill.push(newGasBill);
      })
    }, err => {
      console.log(err);
    })
  }

  getAvailableUnits() {
    this.service.get(environment.BASESERVICE + environment.UNIT_GET_ALL, true).subscribe(response => {
      response.data.forEach(unit => {
        let newUnit = new Unit();
        newUnit._id = unit._id;
        newUnit.name = unit.name;
        this.availableUnits.push(newUnit);
      }, err => {
        console.log(err);
      })
    })
  }

  saveGasBill() {
    this.service.post(environment.BASESERVICE + environment.GAS_BILL_CREATE, true, this.newInstance).subscribe(response => {
      if(response.status == 200) {
        swal("Created Successfully", "your gass bill has created", "success");
        this.getAvailableGasBills();
      }
    }, err => {
      swal("Error", "your gas bill has not created", "warning");
    })
  }

  loadUpdate(updateGasBill: GasBill) {
    this.updateInstance = updateGasBill;
    $("#updateModal").modal("show");
  }

  updateGasBill() {
    this.service.put(environment.BASESERVICE + environment.GAS_BILL_UPDATE + this.updateInstance._id, true, this.updateInstance).subscribe(response => {
      if(response.status == 200) {
        swal("Updated Successfully", "your gass bill has updated", "success");
        this.getAvailableGasBills();
      }
    }, err => {
      swal("Error", "your gas bill has not updated", "warning");
    })
  }

  deleteGasBill(id) {
    swal({
      title: "Are you sure?",
      text: "You are going to delete this gas bill?",
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: "btn-danger",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, It's a mistake!"
    }).then(isConfirmed => {
        if(isConfirmed.value != undefined && isConfirmed.value == true) {
          this.service.delete(environment.BASESERVICE + environment.GAS_BILL_DELETE + id, true).subscribe(response => {
            if(response.status == 200) {
              swal("Deleted GasBill", "your gas bill has deleted", "success");
              this.getAvailableGasBills();
            }
          }, err => {
            swal("Error", "your gas bill has not deleted", "warning");
          })
        }
    })
  }

  private dateSpliter(date) {
    let beforeEditDate = date.split("T");
    return beforeEditDate[0];
  }

}
