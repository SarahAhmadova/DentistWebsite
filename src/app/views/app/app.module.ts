import { AppointmentComponent } from './../../shared/components/appointment/appointment.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRequestsComponent } from './pages/app-requests/app-requests.component';
import { NgbModule, NgbPaginationModule, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './pages/services/services.component';
import { SpecialitiesComponent } from './pages/specialities/specialities.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';


@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    SpecialitiesComponent,
    AppRequestsComponent,
    AppointmentComponent,
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    NgSelectModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppModule { }
