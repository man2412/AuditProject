import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = 'http://localhost:3000/api/hospitals';

  constructor(private http: HttpClient) { }

  getHospitals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addHospital(hospital: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, hospital);
  }

  getHospital(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
