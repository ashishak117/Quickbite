// // src/main.ts
// import { bootstrapApplication } from '@angular/platform-browser';
// import { importProvidersFrom } from '@angular/core';
// import { AppComponent } from './app/app.component';
// import { AppModule } from './app/app.module';

// bootstrapApplication(AppComponent, {
//   // import providers from AppModule to reuse RouterModule, HttpClient, etc.
//   providers: [importProvidersFrom(AppModule)]
// }).catch((err) => console.error(err));

// src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
