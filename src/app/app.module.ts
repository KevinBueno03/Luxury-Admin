import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule , ArrayOfComponents} from './app-routing.module';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { ServiceAdmin } from './services/ServiceAdmin.service';
import { InicioComponent } from './auth/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';

//componentes


@NgModule({
  declarations: [
    AppComponent,
    ArrayOfComponents,
    NavbarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  HttpClientModule],
  providers:[
    ServiceAdmin
  ],  
    
  bootstrap: [AppComponent]
})
export class AppModule { }
