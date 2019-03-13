import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidanceRoleComponent } from './residance-role.component';

describe('ResidanceRoleComponent', () => {
  let component: ResidanceRoleComponent;
  let fixture: ComponentFixture<ResidanceRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidanceRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidanceRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
