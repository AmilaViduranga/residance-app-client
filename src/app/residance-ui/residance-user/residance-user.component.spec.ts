import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidanceUserComponent } from './residance-user.component';

describe('ResidanceUserComponent', () => {
  let component: ResidanceUserComponent;
  let fixture: ComponentFixture<ResidanceUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidanceUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidanceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
