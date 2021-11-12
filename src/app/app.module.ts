import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule , ArrayOfComponents} from './app-routing.module';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './pages/navbar/navbar.component';

//componentes


@NgModule({
  declarations: [
    AppComponent,
    ArrayOfComponents,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
