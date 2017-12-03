import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Conps
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { CommandCenterComponent } from './command-center/command-center.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapApiComponent } from './map-api/map-api.component';
import { GmapsService } from './services/gmaps.service';
import { HttpClient } from '@angular/common/http';

import { ApiService } from './services/api.service';

// Modules
import { SharedModule } from 'primeng/primeng';
import { DropdownModule, ChartModule } from 'primeng/primeng';



const appRoutes: Routes = [
  {
    path: 'crisis-center',
    component: CommandCenterComponent,
    data : {formData : 'data'}
  },
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
    SharedModule,
    ChartModule,
    DropdownModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [GmapsService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
