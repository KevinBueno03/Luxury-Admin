import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        FontAwesomeModule,
        MatSlideToggleModule
    ],
    exports: [
        MatIconModule,
        MatToolbarModule,
        FontAwesomeModule,
        MatSlideToggleModule
  
    ]
    
    
  })
  export class MaterialModule {}
  