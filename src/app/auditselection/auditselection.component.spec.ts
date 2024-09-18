import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditselectionComponent } from './auditselection.component';

describe('AuditselectionComponent', () => {
  let component: AuditselectionComponent;
  let fixture: ComponentFixture<AuditselectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditselectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
