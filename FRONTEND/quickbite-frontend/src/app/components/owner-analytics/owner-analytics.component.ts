import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-owner-analytics',
  templateUrl: './owner-analytics.component.html'
})
export class OwnerAnalyticsComponent implements OnInit {
  summary: any[] = [];

  constructor(private order: OrderService, private rest: RestaurantService, private auth: AuthService) {}

  ngOnInit() {
    const ownerId = this.auth.currentUser?.id!;
    this.rest.getByOwner(ownerId).subscribe(rests => {
      const ids = rests.map(r => r.id || 0);
      this.order.listForOwner(ids).subscribe(orders => {
        const byRest: any = {};
        orders.forEach((o:any) => {
          byRest[o.restaurantId] = byRest[o.restaurantId] || { count: 0, revenue: 0 };
          byRest[o.restaurantId].count += 1;
          byRest[o.restaurantId].revenue += o.totalAmount;
        });
        this.summary = Object.keys(byRest).map(k => ({ restaurantId: +k, ...byRest[k] }));
      });
    });
  }
}
