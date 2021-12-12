import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faShoppingBag,faTruck,faStore,faPowerOff} from '@fortawesome/free-solid-svg-icons'
import { ServiceAdmin } from 'src/app/services/ServiceAdmin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private adminService:ServiceAdmin) { }

  ngOnInit(): void {
  }

  faShoppingBag= faShoppingBag;
  faTruck=faTruck;
  faStore=faStore;
  faPowerOff=faPowerOff;

  showCompanies(){
    console.log("Click Company")
    this.router.navigateByUrl('/admin/companies', { skipLocationChange: true }).then(() => {
    this.router.navigate(['NavbarComponent']);
  }); 
  }
  showOrders(){
    this.router.navigateByUrl('/admin/orders');
  }
  showBikers(){
    console.log("Click Company")
    this.router.navigateByUrl('/admin/bikers', { skipLocationChange: true }).then(() => {
    this.router.navigate(['NavbarComponent']);
  }); 
  }

  logOut(){
    this.adminService.logout();
    this.router.navigateByUrl('/admin', { skipLocationChange: true });
  }
}
