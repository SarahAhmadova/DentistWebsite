import { AuthGuard } from './../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "app"},
  {path: "app", loadChildren: ()=>import('./app/app.module').then(m => m.AppModule), canActivate: [AuthGuard]},
  {path: "auth", loadChildren: ()=>import('./auth/auth.module').then(m => m.AuthModule)},
  {path: "error", loadChildren: ()=>import('./error/error.module').then(m => m.ErrorModule)},
  {path: "**", redirectTo: "/error/not-found"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
