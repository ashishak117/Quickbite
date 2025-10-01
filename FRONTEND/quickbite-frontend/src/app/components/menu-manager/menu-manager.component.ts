// // src/app/components/menu-manager/menu-manager.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
// import { MenuService } from '../../services/menu.service';
// import { ActivatedRoute } from '@angular/router';
// import { UploadService } from '../../services/upload.service';
// import { MenuItem } from '../../models/menu-item.model';

// @Component({
//   selector: 'app-menu-manager',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './menu-manager.component.html'
// })
// export class MenuManagerComponent implements OnInit {
//   restaurantId!: number;
//   items: MenuItem[] = [];
//   editId: number | null = null;
//   form: FormGroup;

//   constructor(
//     private route: ActivatedRoute,
//     private menuSvc: MenuService,
//     private upload: UploadService,
//     private fb: FormBuilder
//   ) {
//     // Create the reactive form here - AFTER fb is available.
//     this.form = this.fb.group({
//       name: [''],
//       price: [0],
//       veg: [true],
//       image: [''],
//       published: [false]
//     });
//   }

//   ngOnInit() {
//     this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
//     this.load();
//   }

//   load() {
//     this.menuSvc.listByRestaurant(this.restaurantId, false).subscribe(m => this.items = m || []);
//   }

//   onFile(ev: Event) {
//     const inp = ev.target as HTMLInputElement;
//     const file = inp.files && inp.files[0];
//     if (!file) return;
//     this.upload.upload(file).subscribe({
//       next: res => {
//         // server returns { url: "/uploads/..." }
//         this.form.patchValue({ image: res.url });
//       },
//       error: err => {
//         console.error('upload err', err);
//         alert('Upload failed');
//       }
//     });
//   }

//   save() {
//     const value = this.form.value;
//     const payload: MenuItem = {
//       id: this.editId ?? undefined,
//       restaurantId: this.restaurantId,
//       name: value.name,
//       price: +value.price,
//       veg: !!value.veg,
//       image: value.image,
//       published: !!value.published
//     };

//     if (this.editId) {
//       this.menuSvc.update(payload).subscribe(() => {
//         this.resetForm();
//         this.load();
//       }, err => { console.error(err); alert('Update failed'); });
//     } else {
//       this.menuSvc.create(payload).subscribe(() => {
//         this.resetForm();
//         this.load();
//       }, err => { console.error(err); alert('Create failed'); });
//     }
//   }

//   startEdit(it: MenuItem) {
//     this.editId = it.id ?? null;
//     this.form.patchValue({
//       name: it.name,
//       price: it.price,
//       veg: !!it.veg,
//       image: it.image || '',
//       published: !!it.published
//     });
//   }

//   resetForm() {
//     this.editId = null;
//     this.form.reset({ name: '', price: 0, veg: true, image: '', published: false });
//   }

//   remove(it: MenuItem) {
//     if (!confirm('Delete item?')) return;
//     this.menuSvc.delete(it.id ?? 0).subscribe(() => this.load(), err => { console.error(err); alert('Delete failed'); });
//   }

//   togglePublish(it: MenuItem) {
//     it.published = !it.published;
//     this.menuSvc.update(it).subscribe(() => this.load(), err => { console.error(err); alert('Publish toggle failed'); });
//   }
// }
// src/app/components/menu-manager/menu-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { MenuItem } from '../../models/menu-item.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-menu-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu-manager.component.html'
})
export class MenuManagerComponent implements OnInit {
  restaurantId!: number;
  items: MenuItem[] = [];
  editId: number | null = null;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private menuSvc: MenuService,
    private upload: UploadService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      price: [0],
      veg: [true],
      image: [''],
      published: [false]
    });
  }

  ngOnInit() {
    this.restaurantId = +this.route.snapshot.paramMap.get('restaurantId')!;
    this.load();
  }

  load() {
    this.menuSvc.listByRestaurant(this.restaurantId, false).subscribe(m => this.items = m || []);
  }

  onFile(ev: Event) {
    const inp = ev.target as HTMLInputElement;
    const file = inp.files && inp.files[0];
    if (!file) return;
    this.upload.upload(file).subscribe({
      next: res => {
        this.form.patchValue({ image: res.url });
      },
      error: err => {
        console.error('upload err', err);
        alert('Upload failed');
      }
    });
  }

  save() {
    const value = this.form.value;
    const payload: MenuItem = {
      id: this.editId ?? undefined,
      restaurantId: this.restaurantId,
      name: value.name,
      price: +value.price,
      veg: !!value.veg,
      image: value.image,
      published: !!value.published
    };

    if (this.editId) {
      this.menuSvc.update(payload).subscribe(() => {
        this.resetForm();
        this.load();
      }, err => { console.error(err); alert('Update failed'); });
    } else {
      this.menuSvc.create(payload).subscribe(() => {
        this.resetForm();
        this.load();
      }, err => { console.error(err); alert('Create failed'); });
    }
  }

  startEdit(it: MenuItem) {
    this.editId = it.id ?? null;
    this.form.patchValue({
      name: it.name,
      price: it.price,
      veg: !!it.veg,
      image: it.image || '',
      published: !!it.published
    });
  }

  resetForm() {
    this.editId = null;
    this.form.reset({ name: '', price: 0, veg: true, image: '', published: false });
  }

  remove(it: MenuItem) {
    if (!confirm('Delete item?')) return;
    this.menuSvc.delete(it.id ?? 0).subscribe(() => this.load(), err => { console.error(err); alert('Delete failed'); });
  }

  togglePublish(it: MenuItem) {
    it.published = !it.published;
    this.menuSvc.update(it).subscribe(() => this.load(), err => { console.error(err); alert('Publish toggle failed'); });
  }

  // helper to resolve image URLs
  imageUrl(path?: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/uploads')) return `${environment.serverUrl}${path}`;
    return `${environment.apiUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}
