import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, MatCardModule],
  declarations: [NotFoundComponent],
  exports: [],
})
export class NotFoundModule {}
