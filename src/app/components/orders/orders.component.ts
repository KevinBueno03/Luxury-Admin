import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceBikerService } from 'src/app/services/service-biker.service';
import { ServiceOrderService } from 'src/app/services/service-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  paidOrders:any;
  motoristasAceptadosActivos:any;
  newidMotorista:any;
  orderActual:any;
  body:any;
  constructor(private modalService:NgbModal, private orderService:ServiceOrderService
    , private bikerService:ServiceBikerService) { }

  ngOnInit(): void {
    this.orderService.obtenerOrdenes().subscribe(
      res =>{
        this.paidOrders=res;
        console.log("orders: ",this.paidOrders)
      }
      ,
      error =>{
        console.log(error);
      }
    )
    
    this.bikerService.obtenerBikersAceptadosActivos().subscribe(
      res =>{
        this.motoristasAceptadosActivos=res;
        console.log("aceptados: ",this.motoristasAceptadosActivos)
      }
      ,
      error =>{
        console.log(error);
      }
    )

    

  }

  openAsignarMotorista(modal:any,idOrder:any){
    this.orderActual=idOrder;
    
    this.modalService.open(
      modal,
      {
        size:'xl',
        centered:true
      }
    );
  

  }

  asignarOrden(biker:any){
    console.log("esteBiker",biker);
    console.log("orden",this.orderActual);

    this.body={idBiker: biker};
    console.log("tiempo");
    this.orderService.updateOrder(this.orderActual,this.body).subscribe(res=>{
    
      if(res){
        Swal.fire('Cambio estado Pedida', 'El pedido '+this.orderActual+' está asignada a ti', 'success');
        this.orderService.obtenerOrdenes().subscribe(
          res =>{
            this.paidOrders=res;
            console.log("orders: ",this.paidOrders)
          }
          ,
          error =>{
            console.log(error);
          }
        )
        this.modalService.dismissAll();

      }else{
        //mostrar mensaje de error
        Swal.fire('Error', 'No se pudo asignar a ti '+biker+' ', 'error');
        
      }
    });

  }
  

}
