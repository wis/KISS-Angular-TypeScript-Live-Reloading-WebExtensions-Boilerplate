import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopupComponent } from './popup/popup.component';
import { OptionsComponent } from './options/options.component';
import { BackgroundComponent } from './background/background.component';
import { RouterModule, Routes } from '@angular/router';
import {
  HashLocationStrategy,
  Location,
  LocationStrategy
} from '@angular/common';
import { NewtabComponent } from './newtab/newtab.component';

const appRoutes: Routes = [
  { path: 'background', component: BackgroundComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'popup', component: PopupComponent },
  { path: 'newtab', component: NewtabComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    OptionsComponent,
    BackgroundComponent,
    NewtabComponent
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
