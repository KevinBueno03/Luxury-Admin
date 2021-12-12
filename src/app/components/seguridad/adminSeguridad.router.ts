import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ServiceAdmin } from "src/app/services/ServiceAdmin.service";


@Injectable()
export class AdminSeguridadRouter implements CanActivate{

  constructor(private seguridadAdminService: ServiceAdmin, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem('token')==null){
      
      this.router.navigateByUrl('/admin');
      return false;
    }else{
      return true;
    }
  }
}