
// src/app/components/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  stats: any = {};
  @ViewChild('ordersCanvas') ordersCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueCanvas') revenueCanvas!: ElementRef<HTMLCanvasElement>;
  ordersChart: any;
  revenueChart: any;

  constructor(private admin: AdminService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.admin.getStats().subscribe({
      next: s => {
        this.stats = s || {};
        // render charts after view updates
        setTimeout(() => this.renderCharts(), 50);
      },
      error: err => console.error('stats err', err)
    });
  }

  renderCharts() {
    try {
      const byRest = this.stats.ordersByRestaurant || [];
      const labels = byRest.map((b: any) => b.restaurantName || b.restaurantId);
      const ordersData = byRest.map((b: any) => b.orders);
      const revenueData = byRest.map((b: any) => b.revenue);

      if (this.ordersChart) this.ordersChart.destroy();
      if (this.revenueChart) this.revenueChart.destroy();

      this.ordersChart = new (window as any).Chart(this.ordersCanvas.nativeElement.getContext('2d'), {
        type: 'bar',
        data: {
          labels,
          datasets: [{ label: 'Orders', data: ordersData }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });

      this.revenueChart = new (window as any).Chart(this.revenueCanvas.nativeElement.getContext('2d'), {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{ label: 'Revenue', data: revenueData }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    } catch (e) {
      console.error('chart render failed', e);
    }
  }

  ngOnDestroy() {
    if (this.ordersChart) this.ordersChart.destroy();
    if (this.revenueChart) this.revenueChart.destroy();
  }
}
