import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiUrl = 'http://localhost:3000/api/audits';
  private parameterNameUrl = 'http://localhost:3000/api/parameter-names'; 

  constructor(private http: HttpClient) { }

  getAuditTypes(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/audit-types`);
  }

  getAuditsByHospitalId(hospitalId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${hospitalId}`);
  }

  createAudit(auditData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, auditData);
  }

  updateAudit(auditId: string, auditTypeId: string): Observable<any> {
    console.log(`Sending PUT request to update audit ID: ${auditId} with auditTypeId: ${auditTypeId}`); // Add logging
    return this.http.put<any>(`${this.apiUrl}/${auditId}`, { auditTypeId });
  }

  addAuditTypes(auditType: { name: string }): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:3000/api/audit-types`, auditType);
  }

  getParameterNamesByAuditType(auditTypeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.parameterNameUrl}/by-audit-type/${auditTypeId}`);
  }

  getAuditParametersByAuditId(auditId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/audit-parameters/${auditId}`);
  }

  saveAuditParameters(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/audit-parameters', data);
  }

  addParameterName(auditTypeId: string, parameterName: string): Observable<any> {
    return this.http.post<any>(`${this.parameterNameUrl}`, { auditTypeId, name: parameterName });
  }

  getAuditTypeById(auditTypeId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/audit-types/${auditTypeId}`);
  }

  updateAuditParameter(id: string, parameterData: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/audit-parameters/${id}`, parameterData);
  }

}
