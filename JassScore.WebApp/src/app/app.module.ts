import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QrScannerModule } from 'angular2-qrscanner';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QrScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
