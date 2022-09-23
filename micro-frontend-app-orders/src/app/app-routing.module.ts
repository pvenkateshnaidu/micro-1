import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { GforceComponent } from './gforce/gforce.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: environment.APP_URL,
    component:GforceComponent
  },
  // Render nothing if navigation goes to other app
  {
    path: '**',
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
