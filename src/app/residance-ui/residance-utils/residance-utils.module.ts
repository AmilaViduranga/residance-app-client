import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input/form-input.component';
import { FormDropdownComponent } from './form-dropdown/form-dropdown.component';
import { FormTableComponent } from './form-table/form-table.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { FormFileComponent } from './form-file/form-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FormInputComponent, 
    FormDropdownComponent, 
    FormTableComponent, 
    FormCheckboxComponent, 
    FormFileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormInputComponent, 
    FormDropdownComponent, 
    FormTableComponent, 
    FormCheckboxComponent,
    FormFileComponent
  ]
})
export class ResidanceUtilsModule { }
