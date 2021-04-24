import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesComponent } from './pages/services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppModule { }
