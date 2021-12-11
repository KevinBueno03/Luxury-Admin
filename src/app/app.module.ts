import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule , ArrayOfComponents} from './app-routing.module';
import { MaterialModule } from './material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ServiceAdmin } from './services/ServiceAdmin.service';

import { HttpClientModule } from '@angular/common/http';
//components
import { AuthComponent } from './components/auth/auth.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ImgPipe } from './components/companies/img.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//componentes


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    OrdersComponent,
    CompaniesComponent,
    ImgPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    SweetAlert2Module
  ],
    
    providers:[
    ServiceAdmin
  ],  
    
  bootstrap: [AppComponent]
})
export class AppModule { }
