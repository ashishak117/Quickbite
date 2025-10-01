import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  form: FormGroup;
  userId?: number;
  loading = false;
  saving = false;
  error = '';
  success = '';
  editing = false;

  private lastSaved: any = null;

  constructor(private fb: FormBuilder, public auth: AuthService, private http: HttpClient) {
    this.form = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }],
      phone: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }]
    });

    const u = this.auth.currentUser;
    if (u) {
      this.userId = u.id;
      this.form.patchValue({
        name: u.name ?? '',
        email: u.email ?? '',
        phone: u.phone ?? '',
        address: u.address ?? ''
      });

      if (this.userId) {
        this.loading = true;
        this.http.get<any>(`${environment.apiUrl}/users/${this.userId}`).subscribe({
          next: full => {
            this.loading = false;
            if (full) {
              this.form.patchValue({
                name: full.name ?? this.form.value.name,
                phone: full.phone ?? '',
                address: full.address ?? ''
              });
            }
            this.lastSaved = this._snapshot();
          },
          error: () => {
            this.loading = false;
            this.lastSaved = this._snapshot();
          }
        });
      } else {
        this.lastSaved = this._snapshot();
      }
    }
  }

  edit() {
    this.error = '';
    this.success = '';
    this.editing = true;
    this.form.controls.name.enable();
    this.form.controls.phone.enable();
    this.form.controls.address.enable();
    // email stays readonly
  }

  cancel() {
    this.error = '';
    this.success = '';
    this.editing = false;
    this._restoreSnapshot(this.lastSaved);
    this.form.controls.name.disable();
    this.form.controls.phone.disable();
    this.form.controls.address.disable();
  }

  save() {
    this.error = '';
    this.success = '';
    if (!this.userId) { this.error = 'Not logged in'; return; }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please fix validation errors';
      return;
    }

    this.saving = true;
    const dto = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address
    };

    this.http.put(`${environment.apiUrl}/users/${this.userId}`, dto).subscribe({
      next: (res: any) => {
        this.saving = false;
        this.editing = false;
        this.form.controls.name.disable();
        this.form.controls.phone.disable();
        this.form.controls.address.disable();
        this.success = 'Profile saved';
        this.lastSaved = this._snapshot();

        const raw = localStorage.getItem('qb_user');
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            parsed.name = dto.name || parsed.name;
            parsed.phone = dto.phone || parsed.phone;
            parsed.address = dto.address || parsed.address;
            localStorage.setItem('qb_user', JSON.stringify(parsed));
          } catch (e) {
            console.warn('Failed to update qb_user in localStorage', e);
          }
        }
      },
      error: err => {
        this.saving = false;
        console.error('Profile save error', err);
        this.error = err?.error?.message || err?.message || 'Save failed';
      }
    });
  }

  private _snapshot() {
    return {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      address: this.form.get('address')?.value
    };
  }

  private _restoreSnapshot(snap: any) {
    if (!snap) return;
    this.form.patchValue({
      name: snap.name ?? '',
      email: snap.email ?? '',
      phone: snap.phone ?? '',
      address: snap.address ?? ''
    });
  }
}
