import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AuditParameter {
  name: string;
  yes: boolean;
  no: boolean;
  description: string;
  rating: number | null;
  editMode: boolean;
  saved: boolean;
  files: { name: string, dataUrl: string }[];
}

@Component({
  selector: 'app-radiology-audit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './radiology-audit.component.html',
  styleUrls: ['./radiology-audit.component.scss']
})
export class RadiologyAuditComponent {
  hospitalName: string = '';
  auditorName: string = '';
  parameters: AuditParameter[] = [
    { name: 'Parameter 1', yes: false, no: false, description: '', rating: null, editMode: false, saved: true, files: [] },
    { name: 'Parameter 2', yes: false, no: false, description: '', rating: null, editMode: false, saved: true, files: [] }
  ];

  newParameterName: string = '';

  editParameter(param: AuditParameter) {
    param.editMode = true;
    param.saved = false;
  }

  saveParameter(param: AuditParameter) {
    param.editMode = false;
    param.saved = true;
  }

  onFileChange(event: any, param: AuditParameter) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        param.files.push({ name: file.name, dataUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeFile(param: AuditParameter, index: number) {
    param.files.splice(index, 1);
  }

  addParameter() {
    if (this.newParameterName.trim()) {
      this.parameters.push({
        name: this.newParameterName,
        yes: false,
        no: false,
        description: '',
        rating: null,
        editMode: true,
        saved: false,
        files: []
      });
      this.newParameterName = '';
    }
  }
  exportToPDF() {
    const doc = new jsPDF();
    let y = 10;
  
    // Add header
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Radiology Audit', 10, y);
    y += 10;
  
    // Add hospital and auditor names
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
  
    if (this.hospitalName.trim()) {
      doc.text(`Hospital Name: ${this.hospitalName}`, 10, y);
      y += 10;
    }
  
    if (this.auditorName.trim()) {
      doc.text(`Auditor Name: ${this.auditorName}`, 10, y);
      y += 10;
    }
  
    // Add parameters
    this.parameters.forEach((param, paramIndex) => {
      if (!param.saved) return; // Skip unsaved parameters
      const hasContent = param.yes || param.no || param.description || param.rating !== null || param.files.length > 0;
  
      if (hasContent) {
        // Add parameter name
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y += 10;
        doc.text(param.name, 10, y);
        y += 10;
  
        // Add Yes/No and Description
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        if (param.yes) {
          doc.text('Yes', 20, y);
          y += 10;
        }
        if (param.no) {
          doc.text('No', 20, y);
          y += 10;
        }
        if (param.description) {
          y += 5;
          const splitDescription = doc.splitTextToSize(param.description, 180);
          doc.text(splitDescription, 20, y);
          y += splitDescription.length * 5;
        }
  
        // Add Rating
        if (param.rating !== null) {
          y += 10;
          doc.text(`Rating: ${param.rating}`, 20, y);
          y += 10;
        }
  
        // Add image attachments to the row
        param.files.forEach((file, index) => {
          if (file.dataUrl.startsWith('data:image')) {
            const img = new Image();
            img.src = file.dataUrl;
            const ratio = img.width / img.height;
            const imgHeight = 80;
            const imgWidth = imgHeight * ratio;
  
            // Add image
            doc.addImage(img.src, 'JPEG', 20, y, imgWidth, imgHeight);
            y += imgHeight + 10;
          }
        });
  
        // Add separator between parameters except for the last one
        if (paramIndex < this.parameters.length - 1) {
          doc.setLineWidth(0.5);
          doc.setDrawColor(0);
          doc.line(10, y, 200, y);
        }
      }
    });
  
    // Save PDF
    doc.save('audit-report.pdf');
  }
  
  
  
  
    
}  
