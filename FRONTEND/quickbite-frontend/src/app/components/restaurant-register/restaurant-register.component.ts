// src/app/components/restaurant-register/restaurant-register.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from '../../services/auth.service';
import { UploadService } from '../../services/upload.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './restaurant-register.component.html'
})
export class RestaurantRegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  success = '';

  // previewImage is a string URL (or null)
  previewImage: string | null = null;
  uploadingImage = false;
  uploadError = '';

  constructor(
    private fb: FormBuilder,
    private rs: RestaurantService,
    private auth: AuthService,
    private router: Router,
    private uploadSvc: UploadService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      about: [''],
      address: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      image: [''] // backend expects image string URL/path
    });
  }

  submit() {
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      this.error = 'Please fill required fields (name and address).';
      return;
    }

    const currentUser = this.auth.currentUser;
    if (!currentUser || !currentUser.id) {
      this.error = 'You must be logged in as an owner to register a restaurant.';
      console.error('No owner id in currentUser', currentUser);
      return;
    }

    // ensure image uses previewImage if set
    const payload = {
      ...this.form.value,
      ownerId: currentUser.id,
      image: this.previewImage ?? this.form.value.image ?? null
    };

    this.loading = true;
    console.log('Creating restaurant payload:', payload);

    this.rs.create(payload).subscribe({
      next: created => {
        this.loading = false;
        this.success = 'Restaurant registration submitted successfully.';
        console.log('Restaurant created response:', created);
        this.router.navigateByUrl('/owner/home');
      },
      error: err => {
        this.loading = false;
        console.error('Create restaurant error', err);
        if (err?.error) this.error = err.error.message || JSON.stringify(err.error);
        else this.error = err.message || 'Failed to create restaurant';
      }
    });
  }

  // file input change -> upload and set previewImage to the returned URL string
  onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const f = input.files[0];

    // client-side size guard (match backend limits)
    const maxBytes = 10 * 1024 * 1024; // 10MB
    if (f.size > maxBytes) {
      this.uploadError = 'File too large (max 10MB)';
      return;
    }

    this.uploadError = '';
    this.uploadingImage = true;

    this.uploadSvc.upload(f).pipe(finalize(() => this.uploadingImage = false)).subscribe({
      next: resp => {
        // resp.url is a string (absolute URL to the uploaded file)
        this.previewImage = resp.url;
        // keep form.image in sync (optional)
        this.form.patchValue({ image: resp.path ?? resp.url });
        console.log('Upload success', resp);
      },
      error: err => {
        console.error('upload err', err);
        this.uploadError = err?.message || 'Upload failed';
        alert('Upload failed: ' + this.uploadError);
      }
    });
  }
}
