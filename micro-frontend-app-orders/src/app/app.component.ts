import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavigationService } from './core/services/navigation.service';

@Component({
  selector: 'gforce-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly previousUrl: string;

  constructor(private readonly router: Router,
              private readonly location: Location,
              private readonly navigationService: NavigationService) {
    this.previousUrl = this.navigationService.getLastSuccessfulNavigationUrl();
  }

  public ngOnInit(): void {
    this.router.initialNavigation();

    // In development we should ignore global navigation problems and navigate to App URL
    if (!environment.production && this.router.url.length <= 1) {
      this.router.navigate([environment.APP_URL]);
      return;
    }

    // Uncomment to see tracing
    // console.log(`[Orders] Router URL: ${ this.router.url }, Last successful: ${ this.previousUrl },`
    //   + ` Location: ${ this.location.path() }`);

    // If application has been initialized before and ever occurred successful navigation
    if (!!this.previousUrl) {
      // Case when we are back from other application (router URL is currently set as URL from other application)
      if (this.router.url !== this.previousUrl) {
        // Uncomment to see tracing
        // console.log('[Orders]', 'AppComponent', 'Navigating to the last successful navigation / component in app!');

        this.router.navigate([this.previousUrl]);

        // Case when we navigate by routerLink in Envelope app
      } else if (this.previousUrl !== this.location.path() && this.previousUrl.startsWith(this.location.path())) {
        // Uncomment to see tracing
        // console.log('[Orders]', 'AppComponent', 'Updating browser URL to current navigation / component in app!');

        // Use @angular/common#Location, do not use window.history!
        this.location.replaceState(this.previousUrl);
      }
    }

    // Resetting also works, but will be used in next micro application
    // this.router.navigate([this.location.path()], { skipLocationChange: true });
  }
}
