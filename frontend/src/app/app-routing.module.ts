import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {StationdetailComponent} from "./components/stationdetail/stationdetail.component";


const routes: Routes = [
  { path: 'api/main', component: MainComponent},
  { path: '', redirectTo: '/api/main', pathMatch: 'full' },
  { path: 'api/', redirectTo: '/api/main', pathMatch: 'full' },
  { path: 'api/station', component: StationdetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
