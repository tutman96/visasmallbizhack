import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CommandCenterComponent } from './command-center/command-center.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapApiComponent } from './map-api/map-api.component';
import { GmapsService } from './services/gmaps.service';
import { HttpClient } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';

const appRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CommandCenterComponent },
  {
    path: 'welcome',
    component: LandingComponent
  },
  {
    path: 'map-api',
    component: MapApiComponent
  },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CommandCenterComponent,
    PageNotFoundComponent,
    MapApiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBAclDpl9PkAYOsKn420KeLCmctF_0Sjxk'
    }),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [GmapsService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
