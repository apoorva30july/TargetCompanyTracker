import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TargetCompanyComponent } from './targetcompany/targetcompany.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'targetcompany',
    component: TargetCompanyComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
