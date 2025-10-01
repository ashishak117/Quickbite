// /* src/app/components/owner-orders/owner-orders.component.ts */
// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../../services/order.service';
// import { AuthService } from '../../services/auth.service';
// import { RestaurantService } from '../../services/restaurant.service';

// @Component({
//   selector: 'app-owner-orders',
//   templateUrl: './owner-orders.component.html'
// })
// export class OwnerOrdersComponent implements OnInit {
//   orders: any[] = [];
//   activeOrders: any[] = [];
//   historyOrders: any[] = [];
//   loading = false;

//   constructor(private ord: OrderService, private auth: AuthService, private rest: RestaurantService) {}

//   ngOnInit() {
//     this.load();
//   }

//   private load() {
//     const ownerId = this.auth.currentUser?.id;
//     if (!ownerId) { this.orders = []; this.activeOrders = []; this.historyOrders = []; return; }

//     this.loading = true;
//     this.rest.getByOwner(ownerId).subscribe({
//       next: (rests: any[]) => {
//         const ids = (rests || []).map(r => r.id || 0);
//         this.ord.listForOwner(ids).subscribe({
//           next: (o: any[]) => {
//             this.loading = false;
//             this.orders = o || [];
//             this.activeOrders = this.orders.filter(x => x.status !== 'CLOSED');
//             this.historyOrders = this.orders.filter(x => x.status === 'CLOSED');
//           },
//           error: err => { this.loading = false; console.error('owner orders err', err); }
//         });
//       },
//       error: err => { this.loading = false; console.error('get owner restaurants err', err); }
//     });
//   }

//   setStatus(order: any, status: string) {
//     this.ord.updateStatus(order.id, status).subscribe({
//       next: () => {
//         // reload lists
//         this.load();
//       },
//       error: err => {
//         console.error('update status err', err);
//         alert('Failed to update status');
//       }
//     });
//   }
// }
/* src/app/components/owner-orders/owner-orders.component.ts */
/* src/app/components/owner-orders/owner-orders.component.ts */
/* src/app/components/owner-orders/owner-orders.component.ts */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { RestaurantService } from '../../services/restaurant.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-owner-orders',
  standalone: true,
  imports: [CommonModule, JsonPipe, RouterModule],
  templateUrl: './owner-orders.component.html'
})
export class OwnerOrdersComponent implements OnInit {
  orders: any[] = [];
  activeOrders: any[] = [];
  historyOrders: any[] = [];
  loading = false;

  constructor(
    private ord: OrderService,
    private auth: AuthService,
    private rest: RestaurantService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }

  private load() {
    const ownerId = this.auth.currentUser?.id;
    if (!ownerId) {
      console.warn('OwnerOrders: no logged-in owner (ownerId missing). Auth user:', this.auth.currentUser);
      this.orders = []; this.activeOrders = []; this.historyOrders = [];
      this.cd.detectChanges();
      return;
    }

    this.loading = true;
    console.log('OwnerOrders.load -> fetching orders for ownerId:', ownerId);

    this.ord.listForOwner(ownerId).subscribe({
      next: (o: any[]) => {
        this.loading = false;
        this.orders = o || [];
        this.activeOrders = this.orders.filter(x => String(x.status).toUpperCase() !== 'CLOSED');
        this.historyOrders = this.orders.filter(x => String(x.status).toUpperCase() === 'CLOSED');

        // defensive fallback (shouldn't be needed now that we see data)
        if (this.activeOrders.length === 0 && this.orders.length > 0) {
          this.activeOrders = this.orders.slice();
        }

        console.log('OwnerOrders loaded — total:', this.orders.length, 'active:', this.activeOrders.length, 'history:', this.historyOrders.length);
        try { this.cd.detectChanges(); } catch (e) {}
      },
      error: err => {
        this.loading = false;
        console.error('owner orders err', err);
        try { this.cd.detectChanges(); } catch (e) {}
        this.retryViaRestaurants(ownerId);
      }
    });
  }

  private retryViaRestaurants(ownerId: number) {
    console.warn('Retrying owner orders via restaurants list...');
    this.rest.getByOwner(ownerId).subscribe({
      next: (rests: any[]) => {
        const ids = (rests || []).map(r => r.id || 0).filter((id: number) => !!id);
        if (ids.length === 0) {
          this.orders = []; this.activeOrders = []; this.historyOrders = []; this.loading = false;
          this.cd.detectChanges();
          return;
        }
        this.ord.listForOwner(ids).subscribe({
          next: (o: any[]) => {
            this.loading = false;
            this.orders = o || [];
            this.activeOrders = this.orders.filter(x => String(x.status).toUpperCase() !== 'CLOSED');
            this.historyOrders = this.orders.filter(x => String(x.status).toUpperCase() === 'CLOSED');
            if (this.activeOrders.length === 0 && this.orders.length > 0) this.activeOrders = this.orders.slice();
            try { this.cd.detectChanges(); } catch (e) {}
            console.log('OwnerOrders fallback loaded — total:', this.orders.length);
          },
          error: e => { this.loading = false; console.error('Fallback owner orders failed', e); try { this.cd.detectChanges(); } catch (e) {} }
        });
      },
      error: e => { this.loading = false; console.error('Failed to get restaurants for owner during fallback', e); try { this.cd.detectChanges(); } catch (e) {} }
    });
  }

  setStatus(order: any, status: string) {
    this.ord.updateStatus(order.id, status).subscribe({
      next: () => this.load(),
      error: err => { console.error('update status err', err); alert('Failed to update status'); }
    });
  }
}
