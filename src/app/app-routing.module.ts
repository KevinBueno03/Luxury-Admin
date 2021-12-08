import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { OrdersComponent } from './components/orders/orders.component';





const routes: Routes = [

  {path:'',redirectTo:'admin',pathMatch:'full'},
  {path: 'admin',component:AuthComponent},
  {path:'admin/orders',component:OrdersComponent},
  {path:'admin/companies',component:CompaniesComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ArrayOfComponents =[AuthComponent,OrdersComponent]