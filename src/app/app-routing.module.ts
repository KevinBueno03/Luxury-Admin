import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './auth/inicio/inicio.component';
import { OrdersComponent } from './pages/orders/orders.component';



const routes: Routes = [

  {path:'',redirectTo:'admin',pathMatch:'full'},
  {path: 'admin',component:InicioComponent},
  {path:'admin/orders',component:OrdersComponent},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ArrayOfComponents =[InicioComponent,OrdersComponent]