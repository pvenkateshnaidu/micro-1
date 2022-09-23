import { BrowserModule } from '@angular/platform-browser';
import { DoBootstrap, Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationService } from './core/services/navigation.service';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { createCustomElement } from '@angular/elements';
import { HomeComponent } from './home/home.component';
import { GforceComponent } from './gforce/gforce.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GforceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule
  ],
  providers: [NavigationService],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector,
              private readonly navigationService: NavigationService,
              private readonly router: Router) {
    // Module will never be implicitly destroyed, so there we can save all Router events
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Catch only micro app routes
        if (event.url.startsWith(`/${ environment.APP_URL }`)) {
          // Uncomment to see tracing
          // console.log('[Orders] setLastSuccessfulNavigationUrl', event.url);
          this.navigationService.setLastSuccessfulNavigationUrl(event.url);
        }
      }
    });
  }

  public ngDoBootstrap() {
    const myElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('gforce-root', myElement);
  }
}
