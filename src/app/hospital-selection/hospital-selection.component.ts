import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HospitalService } from '../services/hospital.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hospital-selection',
  templateUrl: './hospital-selection.component.html',
  styleUrls: ['./hospital-selection.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HospitalSelectionComponent implements OnInit {
  auditorName: string = '';
  auditDate: string = '';
  hospitals: any[] = [];
  selectedHospital: any;
  newHospitalName: string = '';

  constructor(private hospitalService: HospitalService, private router: Router) { }

  ngOnInit(): void {
    this.hospitalService.getHospitals().subscribe(hospitals => {
      this.hospitals = hospitals;
    });
  }

  addHospital() {
    if (this.newHospitalName.trim()) {
      this.hospitalService.addHospital({ name: this.newHospitalName }).subscribe(newHospital => {
        this.hospitals.push(newHospital);
        this.newHospitalName = '';
      });
    }
  }

  proceed() {
    if (this.selectedHospital && this.auditorName && this.auditDate) {
      this.router.navigate(['/hospital', this.selectedHospital._id], {
        queryParams: {
          auditorName: this.auditorName,
          auditDate: this.auditDate
        }
      });
    }
  }
}
