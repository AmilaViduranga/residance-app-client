import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileComponent } from './form-file.component';

describe('FormFileComponent', () => {
  let component: FormFileComponent;
  let fixture: ComponentFixture<FormFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
