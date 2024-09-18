import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyAuditComponent } from './radiology-audit.component';

describe('RadiologyAuditComponent', () => {
  let component: RadiologyAuditComponent;
  let fixture: ComponentFixture<RadiologyAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiologyAuditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologyAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
