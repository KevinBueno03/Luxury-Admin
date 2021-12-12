import { Component, OnInit } from '@angular/core';
import { ServiceBikerService } from 'src/app/services/service-biker.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bikers',
  templateUrl: './bikers.component.html',
  styleUrls: ['./bikers.component.css']
})
export class BikersComponent implements OnInit {

  motoristas:any;
  myActive:any;
  myAccepted:any;
  body:any;

  constructor( private bikerService : ServiceBikerService) { }

  ngOnInit(): void {

    this.bikerService.obtenerBikers().subscribe(
      res =>{
        this.motoristas=res;
        console.log("aceptados: ",this.motoristas)
      }
      ,
      error =>{
        console.log(error);
      }
    )
  }


  cambiarAccepted(accepted:boolean,id:any,nombreBiker:any){
    if(accepted===true){

      this.myAccepted=false;
      this.body={accepted: this.myAccepted};
      console.log("acceptes");
      console.log(id);
      this.bikerService.updateBiker(id,this.body).subscribe(res=>{
        console.log("nose")
        if(res){
          Swal.fire('Cambio estado Motorista', 'El Motorista '+nombreBiker+' No Fue Acceptado ahorita', 'info');
        }else{
          //mostrar mensaje de error
          Swal.fire('Error', 'El producto '+nombreBiker+' no se cambio el estado', 'error');
          
        }
      });

      //this._router.navigateByUrl('/admin/listar-doctores');
    }else if(accepted===false){
     // accepted=true;
     this.myAccepted=true;
     this.body={accepted: this.myAccepted};
     console.log("tiempo");
     this.bikerService.updateBiker(id,this.body).subscribe(res=>{
     
       if(res){
         Swal.fire('Cambio estado Motorista', 'El Motorista '+nombreBiker+' Fue Acceptado ', 'info');
       }else{
         //mostrar mensaje de error
         Swal.fire('Error', 'El producto '+nombreBiker+' no se cambio el estado', 'error');
         
       }
     });

    }
    

  }
  
  cambiarActive(active:boolean,id:any,nombreBiker:any){
    if(active===true){

      this.myActive=false;
      this.body={active: this.myActive};
      console.log("tiempo");

      this.bikerService.updateBiker(id,this.body).subscribe(res=>{
      
        if(res){
          Swal.fire('Cambio estado Motorista', 'El Motorista '+nombreBiker+' está desactivado ahora', 'info');
        }else{
          //mostrar mensaje de error
          Swal.fire('Error', 'El producto '+nombreBiker+' no se cambio el estado', 'error');
          
        }
      });

      //this._router.navigateByUrl('/admin/listar-doctores');
    }else if(active===false){
     // active=true;
     this.myActive=true;
     this.body={active: this
      .myActive};
     console.log("tiempo");
     this.bikerService.updateBiker(id,this.body).subscribe(res=>{
     
       if(res){
         Swal.fire('Cambio estado Motorista', 'El Motorista '+nombreBiker+' está activado ahora', 'info');
       }else{
         //mostrar mensaje de error
         Swal.fire('Error', 'El producto '+nombreBiker+' no se cambio el estado', 'error');
         
       }
     });

    }
    

  }

}
