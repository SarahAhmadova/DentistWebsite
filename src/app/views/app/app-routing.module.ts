import { SpecialitiesComponent } from './pages/specialities/specialities.component';
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
    {path: "esas-sehife", component: DashboardComponent},
    {path: "isciler", component: StaffComponent},
    {path: "xidmetler", component: ServicesComponent},
    {path: "ixtisaslar", component: SpecialitiesComponent}
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
