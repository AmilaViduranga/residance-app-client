import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidanceDashboardComponent } from './residance-dashboard.component';

describe('ResidanceDashboardComponent', () => {
  let component: ResidanceDashboardComponent;
  let fixture: ComponentFixture<ResidanceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidanceDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
