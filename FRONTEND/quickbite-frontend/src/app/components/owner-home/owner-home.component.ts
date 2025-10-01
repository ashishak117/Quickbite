// src/app/components/owner-home/owner-home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-owner-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './owner-home.component.html'
})
export class OwnerHomeComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private rs: RestaurantService, private auth: AuthService, private router: Router) {}

 ngOnInit() {
  const ownerId = this.auth.currentUser?.id;
  if (!ownerId) {
    // no logged-in owner — show empty list
    this.restaurants = [];
    return;
  }
  this.rs.getByOwner(ownerId).subscribe(r => this.restaurants = r);
}


  openMenu(r: Restaurant) {
    this.router.navigate(['/owner/menu', r.id]);
  }
}
