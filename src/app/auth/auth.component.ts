import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoginMode: boolean = true; // Indicates whether it's login mode or signup mode
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  async authenticate() {
    try {
      if (this.isLoginMode) {
        // Login
        await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      } else {
        // Signup
        await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      }
      // Navigate to home or any other route after successful authentication
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error('Error authenticating:', error);
      
      this.errorMessage = error.message; // Display error message to user
    }
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode; // Toggle between login and signup mode
    this.errorMessage = ''; // Clear error message when switching modes
  }
  

  
}
