import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddPaymentDetailsComponent } from './user-add-payment-details.component';

describe('UserAddPaymentDetailsComponent', () => {
  let component: UserAddPaymentDetailsComponent;
  let fixture: ComponentFixture<UserAddPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddPaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
