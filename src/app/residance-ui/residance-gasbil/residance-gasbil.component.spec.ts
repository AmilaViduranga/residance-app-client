import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidanceGasbilComponent } from './residance-gasbil.component';

describe('ResidanceGasbilComponent', () => {
  let component: ResidanceGasbilComponent;
  let fixture: ComponentFixture<ResidanceGasbilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidanceGasbilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidanceGasbilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
