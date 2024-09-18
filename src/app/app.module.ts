import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { firebaseConfig } from './firebase-config'; // Import your Firebase configuration
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuditselectionComponent } from './auditselection/auditselection.component';
import { FormsModule } from '@angular/forms';
import { RadiologyAuditComponent } from './radiology-audit/radiology-audit.component';
import { HospitalSelectionComponent } from './hospital-selection/hospital-selection.component';
import { HospitalComponent } from './hospital/hospital.component';
import { AuditService } from './services/audit.service';
import { HospitalService } from './services/hospital.service';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuditselectionComponent,
    RadiologyAuditComponent,
    HospitalSelectionComponent,
    HospitalComponent
    // Add other components as needed
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [AuditService, HospitalService,provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient with interceptors
  { provide: HTTP_INTERCEPTORS, useExisting: provideHttpClient, multi: true } // Add HTTP_INTERCEPTORS provider
],
  bootstrap: [AppComponent]
})
export class AppModule { }