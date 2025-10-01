// src/app/components/auth/auth.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { Role } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  authForm: FormGroup;
  loginError = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      mode: ['login'], // or 'register'
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [''],
      address: [''],
      role: ['CUSTOMER'] // CUSTOMER or OWNER
    });
  }

  switchMode(mode: 'login' | 'register') {
    this.authForm.patchValue({ mode });
  }

  submit() {
    const mode = this.authForm.value.mode;
    if (mode === 'register') {
      const user = {
        name: this.authForm.value.name,
        email: this.authForm.value.email,
        password: this.authForm.value.password,
        phone: this.authForm.value.phone,
        address: this.authForm.value.address,
        role: this.authForm.value.role as Role
      };
      this.auth.register(user).subscribe({
        next: () => {
          alert('Registered and logged in.');
          this.router.navigate(['/']);
        },
        error: err => {
          console.error('Register error', err);
          this.loginError = err?.error?.message || err?.message || 'Registration failed';
        }
      });
    } else {
      this.auth.login(this.authForm.value.email, this.authForm.value.password).subscribe({
        next: u => {
          if (!u) {
            this.loginError = 'Invalid credentials';
          } else {
            this.router.navigate(['/']);
          }
        },
        error: err => {
          console.error('Login error', err);
          this.loginError = err?.error?.message || 'Login failed';
        }
      });
    }
  }
}
