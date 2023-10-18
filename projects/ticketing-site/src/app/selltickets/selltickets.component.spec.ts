import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellticketsComponent } from './selltickets.component';

describe('SellticketsComponent', () => {
  let component: SellticketsComponent;
  let fixture: ComponentFixture<SellticketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellticketsComponent]
    });
    fixture = TestBed.createComponent(SellticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
