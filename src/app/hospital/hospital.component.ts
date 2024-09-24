import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuditService } from '../services/audit.service';
import { HospitalService } from '../services/hospital.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HospitalComponent implements OnInit {
  hospital: any;
  audits: any[] = [];
  auditorName!: string;
  auditDate!: string;

  constructor(
    private route: ActivatedRoute,
    private hospitalService: HospitalService,
    private auditService: AuditService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const hospitalId = this.route.snapshot.paramMap.get('id')?? '';
    this.auditorName = this.route.snapshot.queryParamMap.get('auditorName')?? '';
    this.auditDate = this.route.snapshot.queryParamMap.get('auditDate')?? '';

    this.hospitalService.getHospital(hospitalId).subscribe(hospital => {
      this.hospital = hospital;
      this.auditService.getAuditsByHospitalId(hospitalId).subscribe(audits => {
        this.audits = audits;
      });
    });
  }

  startNewAudit() {
    const newAudit = {
      auditorName: this.auditorName,
      hospitalId: this.hospital._id,
      auditTypeId: null,
      date: this.auditDate
    };

    this.auditService.createAudit(newAudit).subscribe(audit => {
      this.router.navigate(['/audit-selection', this.hospital._id], {
        queryParams: {
          auditorName: this.auditorName,
          auditDate: this.auditDate,
          auditId: audit._id
        }
      });
    });
  }

  resumeAudit(audit: any) {
    let auditRoute = 'audit-screen';
    this.router.navigate([`/${auditRoute}`, audit._id], {
      queryParams: {
        hospitalId: this.hospital._id,
        auditTypeId: audit.auditTypeId._id,
        auditorName: this.auditorName,
        auditDate: this.auditDate
      }
    });
  }
}
