import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidanceTenantsComponent } from './residance-tenants.component';

describe('ResidanceTenantsComponent', () => {
  let component: ResidanceTenantsComponent;
  let fixture: ComponentFixture<ResidanceTenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidanceTenantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidanceTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
