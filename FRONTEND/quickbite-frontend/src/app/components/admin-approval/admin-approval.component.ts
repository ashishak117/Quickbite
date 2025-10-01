
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { RestaurantService } from '../../services/restaurant.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-approval.component.html'
})
export class AdminApprovalComponent {
  pending: any[] = [];
  loading = false;
  error = '';
  selected: any = null;
  ownerInfo: any = null;

  constructor(private admin: AdminService, private rest: RestaurantService, private http: HttpClient) {
    this.load();
  }

  load() {
    this.loading = true; this.error = '';
    this.admin.getPending().subscribe({
      next: p => { this.pending = p || []; this.loading = false; },
      error: err => { console.error('AdminApproval load error', err); this.error = 'Failed to load pending restaurants'; this.loading = false; }
    });
  }

  viewDetails(r: any) {
    this.selected = r;
    this.ownerInfo = null;
    if (r && r.ownerId) {
      this.http.get<any>(`${environment.apiUrl}/users/${r.ownerId}`).subscribe({
        next: o => this.ownerInfo = o,
        error: () => { /* ignore */ }
      });
    }
  }

  approve(id: number) {
    this.admin.approve(id).subscribe({
      next: () => { this.selected = null; this.load(); },
      error: err => { console.error('approve error', err); alert('Failed to approve'); }
    });
  }

  deny(id: number) {
    const msg = prompt('Reason for denial') || 'Denied';
    this.admin.deny(id, msg).subscribe({
      next: () => { this.selected = null; this.load(); },
      error: err => { console.error('deny error', err); alert('Failed to deny'); }
    });
  }
}
