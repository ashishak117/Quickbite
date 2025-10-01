// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Restaurant } from '../../models/restaurant.model';
// import { RestaurantService } from '../../services/restaurant.service';
// import { Router } from '@angular/router';
// import { environment } from '../../../environments/environment';

// @Component({
//   selector: 'app-customer-home',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './customer-home.component.html'
// })
// export class CustomerHomeComponent implements OnInit {
//   restaurants: Restaurant[] = [];

//   constructor(private rest: RestaurantService, private router: Router) {}

//   ngOnInit() { this.load(); }

//   load() { this.rest.getAll().subscribe(r => this.restaurants = r); }

//   open(r: Restaurant) { this.router.navigate(['/restaurant', r.id]); }

//   imageUrl(path?: string) {
//     if (!path) return ''; // can return placeholder
//     if (path.startsWith('http')) return path;
//     // ensure single slash between base and path
//     return `${environment.apiUrl}${path.startsWith('/') ? '' : '/'}${path}`;
//   }
// }

// src/app/components/customer-home/customer-home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-home.component.html'
})
export class CustomerHomeComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private rest: RestaurantService, private router: Router) {}

  ngOnInit() { this.load(); }

  load() { this.rest.getAll().subscribe(r => this.restaurants = r || []); }

  open(r: Restaurant) { this.router.navigate(['/restaurant', r.id]); }

  imageUrl(path?: string) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    // uploads are served from server root (no /api); other API paths stay under apiUrl
    if (path.startsWith('/uploads')) {
      return `${environment.serverUrl}${path}`;
    }
    return `${environment.apiUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }
}
