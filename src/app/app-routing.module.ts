import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { BikersComponent } from './components/bikers/bikers.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminSeguridadRouter } from './components/seguridad/adminSeguridad.router';






const routes: Routes = [

  {path:'',redirectTo:'admin',pathMatch:'full'},
  {path: 'admin',component:AuthComponent},
  {path:'admin/orders',component:OrdersComponent},
  {path:'admin/companies',component:CompaniesComponent},
  {path:'admin/bikers',component:BikersComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ArrayOfComponents =[AuthComponent]