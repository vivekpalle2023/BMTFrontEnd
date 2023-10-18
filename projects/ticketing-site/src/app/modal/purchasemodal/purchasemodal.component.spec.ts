import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasemodalComponent } from './purchasemodal.component';

describe('PurchasemodalComponent', () => {
  let component: PurchasemodalComponent;
  let fixture: ComponentFixture<PurchasemodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasemodalComponent]
    });
    fixture = TestBed.createComponent(PurchasemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
