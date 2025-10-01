// src/app/components/not-found/not-found.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div class="mt-5 text-center"><h3>Page not found</h3><a routerLink="/">Go home</a></div>`
})
export class NotFoundComponent {}
