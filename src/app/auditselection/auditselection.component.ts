import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditService } from '../services/audit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audit-selection',
  templateUrl: './auditselection.component.html',
  styleUrls: ['./auditselection.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AuditselectionComponent implements OnInit {
  auditTypes: any[] = [];
  hospitalId!: string;
  auditorName!: string;
  auditDate!: string;
  auditId!: string;
  newAuditTypeName: string = '';

  constructor(
    private auditService: AuditService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hospitalId = this.route.snapshot.paramMap.get('hospitalId') ?? '';
    this.auditorName = this.route.snapshot.queryParamMap.get('auditorName') ?? '';
    this.auditDate = this.route.snapshot.queryParamMap.get('auditDate') ?? '';
    this.auditId = this.route.snapshot.queryParamMap.get('auditId') ?? '';
    this.loadAuditTypes();
  }
  loadAuditTypes(): void {
    this.auditService.getAuditTypes().subscribe(auditTypes => {
      this.auditTypes = auditTypes;
    });
  }


  startAudit(auditTypeName: string) {
    const auditType = this.auditTypes.find(type => type.name === auditTypeName);

    if (auditType && this.auditId) {
      console.log(`Updating audit ID: ${this.auditId} with auditTypeId: ${auditType._id}`); // Add logging
      this.auditService.updateAudit(this.auditId, auditType._id).subscribe(() => {
        let auditRoute = '';
        switch (auditTypeName) {
          case 'HR Audit':
            auditRoute = 'hr-audit';
            break;
          case 'Radiology Audit':
            auditRoute = 'radiology-audit';
            break;
          // Add cases for other audit types here
          default:
            auditRoute = 'radiology-audit'; // Default to radiology audit
        }

        this.router.navigate([`/${auditRoute}`, this.auditId], {
          queryParams: {
            hospitalId: this.hospitalId,
            auditTypeId: auditType._id,
            auditorName: this.auditorName,
            auditDate: this.auditDate
          }
        });
      });
    } else {
      console.error('Audit type not found or auditId is missing'); // Add logging
    }
  }

  addAuditType() {
    if (this.newAuditTypeName.trim()) {
      this.auditService.addAuditTypes({ name: this.newAuditTypeName.trim() }).subscribe(() => {
        this.newAuditTypeName = ''; // Clear input field
        this.loadAuditTypes(); // Refresh the list of audit types
      });
    } else {
      console.error('New audit type name cannot be empty');
    }
  }
}
