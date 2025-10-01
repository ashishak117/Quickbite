// /* src/app/components/order-status/order-status.component.ts */
// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../../services/order.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-order-status',
//   templateUrl: './order-status.component.html'
// })
// export class OrderStatusComponent implements OnInit {
//   orders: any[] = [];
//   activeOrders: any[] = [];
//   historyOrders: any[] = [];
//   loading = false;

//   constructor(private orderSvc: OrderService, private auth: AuthService) {}

//   ngOnInit() {
//     this.load();
//   }

//   load() {
//     const customerId = this.auth.currentUser?.id;
//     if (!customerId) { this.orders = []; this.activeOrders = []; this.historyOrders = []; return; }
//     this.loading = true;
//     this.orderSvc.listByCustomer(customerId).subscribe({
//       next: o => {
//         this.loading = false;
//         this.orders = o || [];
//         this.activeOrders = this.orders.filter(x => x.status !== 'CLOSED');
//         this.historyOrders = this.orders.filter(x => x.status === 'CLOSED');
//       },
//       error: err => { this.loading = false; console.error('customer orders err', err); }
//     });
//   }

//   confirmReceived(orderId: number) {
//     if (!confirm('Confirm you have received the food?')) return;
//     this.orderSvc.updateStatus(orderId, 'CLOSED').subscribe({
//       next: () => {
//         alert('Thanks — order closed.');
//         this.load();
//       },
//       error: err => { console.error('confirm err', err); alert('Failed to confirm'); }
//     });
//   }
// }
/* src/app/components/order-status/order-status.component.ts */
/* src/app/components/order-status/order-status.component.ts */
/* src/app/components/order-status/order-status.component.ts */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './order-status.component.html'
})
export class OrderStatusComponent implements OnInit {
  orders: any[] = [];
  activeOrders: any[] = [];
  historyOrders: any[] = [];
  loading = false;

  constructor(private orderSvc: OrderService, private auth: AuthService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.load();
  }

  load() {
    const customerId = this.auth.currentUser?.id;
    console.log('OrderStatus.load -> customerId:', customerId);
    if (!customerId) { this.orders = []; this.activeOrders = []; this.historyOrders = []; this.cd.detectChanges(); return; }
    this.loading = true;
    this.orderSvc.listByCustomer(customerId).subscribe({
      next: o => {
        this.loading = false;
        this.orders = o || [];
        this.activeOrders = this.orders.filter(x => String(x.status).toUpperCase() !== 'CLOSED');
        this.historyOrders = this.orders.filter(x => String(x.status).toUpperCase() === 'CLOSED');

        if (this.activeOrders.length === 0 && this.orders.length > 0) {
          this.activeOrders = this.orders.slice();
        }

        try { this.cd.detectChanges(); } catch (e) {}
      },
      error: err => { this.loading = false; console.error('customer orders err', err); try { this.cd.detectChanges(); } catch (e) {} }
    });
  }

  confirmReceived(orderId: number) {
    if (!confirm('Confirm you have received the food?')) return;
    this.orderSvc.updateStatus(orderId, 'CLOSED').subscribe({
      next: () => {
        alert('Thanks — order closed.');
        this.load();
      },
      error: err => { console.error('confirm err', err); alert('Failed to confirm'); }
    });
  }
}
