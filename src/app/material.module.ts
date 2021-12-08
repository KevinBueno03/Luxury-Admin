import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";



@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        FontAwesomeModule
    ],
    exports: [
        MatIconModule,
        MatToolbarModule,
        FontAwesomeModule
  
    ]
    
    
  })
  export class MaterialModule {}
  