import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidanceUnitComponent } from './residance-unit.component';

describe('ResidanceUnitComponent', () => {
  let component: ResidanceUnitComponent;
  let fixture: ComponentFixture<ResidanceUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidanceUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidanceUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
