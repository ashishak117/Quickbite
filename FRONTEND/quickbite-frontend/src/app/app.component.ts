// // src/app/app.component.ts
// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { NavbarComponent } from './components/navbar/navbar.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterModule, NavbarComponent],
//   template: `<app-navbar></app-navbar><div class="container container-max"><router-outlet></router-outlet></div>`
// })
// export class AppComponent {}
// src/app/app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
//   template: `<app-navbar></app-navbar><div class="container container-max"><router-outlet></router-outlet></div><app-footer></app-footer>`
// })
// export class AppComponent {}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  template: `
  <div class="app-shell d-flex flex-column min-vh-100">
    <app-navbar></app-navbar>
    <main class="flex-grow-1 container container-max py-4">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  </div>
`

})
export class AppComponent {}

