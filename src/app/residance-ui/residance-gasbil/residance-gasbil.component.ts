import { Component, OnInit } from '@angular/core';
import { BasicRestService } from '../../services/basic-rest.service';
import { environment } from '../../../environments/environment';
import { GasBill } from '../../residance-models/gasbill.model';
import { Tenant } from '../../residance-models/tenant.model';
import { Unit } from '../../residance-models/units.model';
import swal from 'sweetalert2';
import { Statics } from 'src/app/services/statics';
import { BasicAuthService } from '../../services/basic-auth.service';
import { Menu } from '../../residance-models/role.model';
declare var $ :any;

@Component({
  selector: 'app-residance-gasbil',
  templateUrl: './residance-gasbil.component.html',
  styleUrls: ['./residance-gasbil.component.css']
})
export class ResidanceGasbilComponent implements OnInit {
  new_uploaded_pay_slip: string = "Upload Pay Slip";
  update_uploaded_pay_slip: string = "Upload Pay Slip";
  availableGasBill:Array<GasBill> = new Array<GasBill>();
  availableUnits:Array<Unit> = new Array<Unit>();
  availableTenants: Array<Tenant> = new Array<Tenant>();
  newInstance:GasBill = new GasBill();
  updateInstance:GasBill = new GasBill();
  menu:Menu = new Menu();
  magnify_payslip:string = "../../../assets/img/default-avatar.png";

  constructor(private service: BasicRestService, private authService: BasicAuthService) { }

  ngOnInit() {
    this.grantAccess();
    this.getAvailableGasBills();
    this.getAvailableUnits();
    this.getAvailableTenants();
    this.newInstance.publishedBy = Statics.userId;
  }

  getAvailableGasBills() {
    this.availableGasBill = [];
    if(this.menu.isView && this.menu.canViewOthers) {
      this.getAllGassBills();
    } else {
      let query = {
        "publishedBy": this.authService.getUserId()
      }
      this.getGassBillsUsingQuery(query);
    }
  }

  getAllGassBills() {
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
        newGasBill.tenant_id = gasbill.tenant_id._id;
        if(gasbill.pay_slip) {
          this.service.post(environment.BASESERVICE + environment.GAS_BILL_GET_PAY_SLIP, true, {"path": gasbill.pay_slip}).subscribe(file => {
            newGasBill.pay_slip = "data:image/png;base64," + file.data;
            this.availableGasBill.push(newGasBill);
          })
        } else {
          this.availableGasBill.push(newGasBill);
        }
      })
    }, err => {
      console.log(err);
    })
  }

  getGassBillsUsingQuery(query) {
    this.service.post(environment.BASESERVICE + environment.GAS_BILL_GET_BY_QUERY, true, query).subscribe(response => {
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
        newGasBill.tenant_id = gasbill.tenant_id._id;
        if(gasbill.pay_slip) {
          this.service.post(environment.BASESERVICE + environment.GAS_BILL_GET_PAY_SLIP, true, {"path": gasbill.pay_slip}).subscribe(file => {
            newGasBill.pay_slip = "data:image/png;base64," + file.data;
            this.availableGasBill.push(newGasBill);
          })
        } else {
          this.availableGasBill.push(newGasBill);
        }
      })
    }, err => {
      console.log(err);
    })
  }

  grantAccess() {
    this.menu.isView = this.authService.isGranted(Statics.GAS_BILL, Statics.VIEW);
    this.menu.isUpdate = this.authService.isGranted(Statics.GAS_BILL, Statics.UPDATE);
    this.menu.isInsert = this.authService.isGranted(Statics.GAS_BILL, Statics.INSERT);
    this.menu.isDelete = this.authService.isGranted(Statics.GAS_BILL, Statics.DELETE);
    this.menu.canViewOthers = this.authService.isGranted(Statics.GAS_BILL, Statics.VIEW_ELSE);
    this.menu.canInsertOthers = this.authService.isGranted(Statics.GAS_BILL, Statics.INSERT_ELSE);
    this.menu.canEditOthers = this.authService.isGranted(Statics.GAS_BILL, Statics.UPDATE_ELSE);
    this.menu.canDeleteOthers = this.authService.isGranted(Statics.GAS_BILL, Statics.DELETE_ELSE);
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

  getAvailableTenants() {
    this.service.get(environment.BASESERVICE + environment.TENANT_GET_ALL, true).subscribe(response => {
      response.data.forEach(tenant => {
        let newTenant = new Tenant();
        newTenant._id = tenant._id;
        newTenant.name = tenant.name;
        this.availableTenants.push(newTenant);
      }, err => {
        console.log(err);
      })
    })
  }

  saveGasBill() {
    this.newInstance.publishedBy = this.authService.getUserId();;
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

  enlargeImage(instance: GasBill) {
    this.magnify_payslip = instance.pay_slip;
    $("#viewGassbillModal").modal("show");
  }

  uploadPaySlip(event, instance: GasBill, action: string) {
    if(action == 'insert') {
      this.new_uploaded_pay_slip = "Pay Slip Attached"
    }

    if(action == 'update') {
      this.update_uploaded_pay_slip = "Pay Slip Attached"
    }
    var file:File = event.target.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      instance.pay_slip = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  private dateSpliter(date) {
    let beforeEditDate = date.split("T");
    return beforeEditDate[0];
  }

}
