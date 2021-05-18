import { ContactComponent } from './pages/contact/contact.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AppointmentComponent } from './../../shared/components/appointment/appointment.component';
import { AppRequestsComponent } from './pages/app-requests/app-requests.component';
import { SpecialitiesComponent } from './pages/specialities/specialities.component';
import { ServicesComponent } from './pages/services/services.component';
import { StaffComponent } from './pages/staff/staff.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './pages/appointments/appointments.component';

const routes: Routes = [
 {
  path: "", component: AppComponent,
  children: [
    {path: "", pathMatch: "full",redirectTo: "dashboard"},
    {path: "esas-sehife", component: DashboardComponent},
    {path: "isciler", component: StaffComponent},
    {path: "xidmetler", component: ServicesComponent},
    {path: "ixtisaslar", component: SpecialitiesComponent},
    {path: "sorgular", component: AppRequestsComponent},
    {path: "randevular", component: AppointmentsComponent},
    {path: "haqqimizda", component: AboutUsComponent},
    {path: "elaqe",component: ContactComponent}

  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
