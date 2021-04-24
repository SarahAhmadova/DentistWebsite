import { ServicesComponent } from './pages/services/services.component';
import { StaffComponent } from './pages/staff/staff.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
  path: "", component: AppComponent,
  children: [
    {path: "", pathMatch: "full",redirectTo: "dashboard"},
    {path: "dashboard", component: DashboardComponent},
    {path: "staff", component: StaffComponent},
    {path: "services", component: ServicesComponent}
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
