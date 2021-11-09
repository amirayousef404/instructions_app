import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import module admin
import { AdminModule } from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { ServiceService } from './admin/service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InstructionsInterceptor } from './instructions.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    NotfoundpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InstructionsInterceptor,
      multi: true
    },
    ServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
