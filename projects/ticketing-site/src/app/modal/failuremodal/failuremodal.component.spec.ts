import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailuremodalComponent } from './failuremodal.component';

describe('FailuremodalComponent', () => {
  let component: FailuremodalComponent;
  let fixture: ComponentFixture<FailuremodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailuremodalComponent]
    });
    fixture = TestBed.createComponent(FailuremodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
