import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuditselectionComponent } from './auditselection/auditselection.component';
import { RadiologyAuditComponent } from './radiology-audit/radiology-audit.component';
import { HospitalComponent } from './hospital/hospital.component';
import { HospitalSelectionComponent } from './hospital-selection/hospital-selection.component';

export const routes: Routes = [
    { path: '', redirectTo: '/hospital-selection', pathMatch: 'full' },
    { path: 'hospital-selection', component: HospitalSelectionComponent },
    { path: 'hospital/:id', component: HospitalComponent },
    { path: 'audit-selection/:hospitalId', component: AuditselectionComponent },
    { path: 'audit-screen/:auditId', component: RadiologyAuditComponent },
    { path: '**', redirectTo: '/hospital-selection' }
];
