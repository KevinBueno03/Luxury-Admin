import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule
        
    ],
    exports: [
        MatIconModule,
        MatToolbarModule
      
  
    ]
    
    
  })
  export class MaterialModule {}
  