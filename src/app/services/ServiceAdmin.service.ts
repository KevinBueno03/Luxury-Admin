import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError,map,tap } from "rxjs/operators";
import { of } from "rxjs";


import { LoginResponse } from "../interfaces/admin.interfaces";



@Injectable({
    providedIn:'root'
}) export class ServiceAdmin {
    
    private APIURL:string = environment.APIURL;

    constructor(private http:HttpClient){

    }

    login(email:string,password:string){
        const url= `${this.APIURL}/login?type=admin`;
        const body={email,password};
        return this.http.post<any>(url,body).pipe(
            tap(res => {
                if(res.token){
                    localStorage.setItem('token',res.token!);
                }
            }),map(res => true),
            catchError(err => of(false))

        )
    }

    validateToken(){
        const url= `${this.APIURL}/auth`;

        const headers= new HttpHeaders()
        .set('x-access-token',localStorage.getItem('token') || '');
        return this.http.get(url,{headers})

    }

    logout(){
        localStorage.clear();
    }

} 
