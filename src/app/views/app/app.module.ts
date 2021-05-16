import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { StaffComponent } from './pages/staff/staff.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './pages/services/services.component';
import { SpecialitiesComponent } from './pages/specialities/specialities.component';
import { NgbdSortableHeader } from './pages/specialities/sortable.directive';


@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent,
    SpecialitiesComponent,
    NgbdSortableHeader
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule
    ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppModule { }
