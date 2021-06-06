import { AppointmentComponent } from './shared/components/appointment/appointment.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './views/app/layout/layout.module';
import { DashboardComponent } from './views/app/pages/dashboard/dashboard.component';
import { StaffComponent } from './views/app/pages/staff/staff.component';
import { NotifierModule} from 'angular-notifier';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileUploadModule } from 'ng2-file-upload';
import { NgconfSearchModule } from 'ngconf-search';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StaffComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    NotifierModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxDropzoneModule,
    FileUploadModule,
    NgconfSearchModule,
    NgbModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
