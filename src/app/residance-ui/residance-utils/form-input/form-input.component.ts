import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {

  @Input() id: string;
  @Input() labelValue: string;
  @Input() type: string;
  @Input() model: any;
  @Input() key: string;
  @Input() name: string;
  @Input() index: number;

  @Output() fieldValue:EventEmitter<any>;

  constructor() { 
    this.id = "Index";
    this.type = "text";
    this.index = 0;
    this.fieldValue = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  isModelDirty() {
    this.fieldValue.emit({
      key: this.key,
      model: this.model,
      index: this.index
    })
  }

}
