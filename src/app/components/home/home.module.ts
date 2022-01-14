import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, MatCardModule],
  declarations: [HomeComponent],
  exports: [],
})
export class HomeModule {}
