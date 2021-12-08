import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faShoppingBag,faTruck,faStore} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  faShoppingBag= faShoppingBag;
  faTruck=faTruck;
  faStore=faStore;

  showCompanies(){
    console.log("Click Company")
    this.router.navigateByUrl('/admin/companies', { skipLocationChange: true }).then(() => {
    this.router.navigate(['NavbarComponent']);
  }); 
  }
}
