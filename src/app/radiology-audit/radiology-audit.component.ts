import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuditService } from '../services/audit.service';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../services/hospital.service';

@Component({
  selector: 'app-radiology-audit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './radiology-audit.component.html',
  styleUrls: ['./radiology-audit.component.scss']
})
export class RadiologyAuditComponent implements OnInit {
  auditTypeId: string = '';
  hospitalId: string = '';
  auditorName: string = '';
  auditDate: string = '';
  auditId: string = '';
  parameters: any[] = [];
  newParameterName: string = ''; // Field for adding new parameter
  auditTypeName: string = '';
  hospitalName: string = '';

  constructor(
    private route: ActivatedRoute,
    private auditService: AuditService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.auditTypeId = this.route.snapshot.queryParams['auditTypeId'];
    this.hospitalId = this.route.snapshot.queryParams['hospitalId'];
    this.auditorName = this.route.snapshot.queryParams['auditorName'];
    this.auditDate = this.route.snapshot.queryParams['auditDate'];
    this.auditId = this.route.snapshot.params['auditId'];

    this.loadParameters(this.auditId);
    this.loadParameterNames(this.auditTypeId);
    this.loadAuditType(this.auditTypeId);
    this.loadHospital(this.hospitalId);
  }

  loadParameters(auditId: string): void {
    this.auditService.getAuditParametersByAuditId(auditId).subscribe({
      next: (auditParameters) => {
        this.parameters = auditParameters.map(param => ({
          ...param,
          description: param.description || '',
          fileUrls: param.fileUrls || [],
          priority: param.priority || '',
          rating: param.rating || 0,
          category: param.category || '',
          availability: param.availability || false,
          parameterNameId: param.parameterNameId,  // Ensure parameterNameId is mapped
          parameterName: ''
        }));
      },
      error: (error) => {
        console.error('Error loading audit parameters:', error);
      }
    });
  }

  loadParameterNames(auditTypeId: string): void {
    this.auditService.getParameterNamesByAuditType(auditTypeId).subscribe({
      next: (parameterNames) => {
        // Map parameter names to their respective parameterNameId
        this.parameters.forEach(param => {
          const foundParameterName = parameterNames.find(pn => pn._id === param.parameterNameId);
          if (foundParameterName) {
            param.parameterName = foundParameterName.name; // Assign the name
          }
        });
      },
      error: (error) => {
        console.error('Error loading parameter names:', error);
      }
    });
  }


  loadAuditType(auditTypeId: string): void {
    this.auditService.getAuditTypeById(auditTypeId).subscribe({
      next: (auditType) => {
        this.auditTypeName = auditType.name;
      },
      error: (error) => {
        console.error('Error fetching audit type:', error);
      }
    });
  }

  loadHospital(hospitalId: string): void {
    this.hospitalService.getHospital(hospitalId).subscribe({
      next: (hospital) => {
        this.hospitalName = hospital.name;
      },
      error: (error) => {
        console.error('Error fetching hospital:', error);
      }
    });
  }

  saveAndResumeLater(): void {
    this.parameters.forEach(parameter => {
      const auditParameterData = {
        auditId: this.auditId,
        parameterNameId: parameter.parameterNameId,
        description: parameter.description,
        fileUrls: parameter.fileUrls,
        priority: parameter.priority,
        rating: parameter.rating,
        category: parameter.category,
        availability: parameter.availability
      };

      if (parameter._id) {
        // Update existing parameter (PUT)
        this.auditService.updateAuditParameter(parameter._id, auditParameterData).subscribe({
          next: (response) => {
            console.log('Parameter updated:', response);
          },
          error: (error) => {
            console.error('Error updating parameter:', error);
          }
        });
      } else {
        // Save new parameter (POST)
        this.auditService.saveAuditParameters(auditParameterData).subscribe({
          next: (response) => {
            console.log('New parameter saved:', response);
            // Update the parameter with the returned ID
            parameter._id = response._id;
          },
          error: (error) => {
            console.error('Error saving parameter:', error);
          }
        });
      }
    });
  }

  addParameter(): void {
    if (this.newParameterName) {
      const newParameter = {
        name: this.newParameterName,
        description: '',
        fileUrls: [],
        priority: '',
        rating: 0,
        category: '',
        availability: false
      };
      this.parameters.push(newParameter);
      this.newParameterName = ''; // Clear input after adding
    }
  }

  exportToPDF(): void {
  }
}
