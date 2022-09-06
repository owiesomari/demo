import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: "", redirectTo:'home', pathMatch: "full"},
  {path: "home", component:HomeComponent},
  {path: "dashboard", component: DashboardComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
