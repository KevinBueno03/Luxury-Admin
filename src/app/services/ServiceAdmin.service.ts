import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError,map,tap } from "rxjs/operators";
import { Observable, of } from "rxjs";


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

    obtenerCategorias():Observable<any>{
        return this.http.get(`${this.APIURL}/categories`,{})
    }

    obtenerLocales(idCategoria:any):Observable<any>{
        return this.http.get(`${this.APIURL}/category/${idCategoria}/companies`,{})
    }
    
    obtenerProductos(idCompany:any):Observable<any>{
        return this.http.get(`${this.APIURL}/company/${idCompany}/products`,{})
    }
    
    obtenerCompany(idCompany:any):Observable<any>{
        return this.http.get(`${this.APIURL}/companies/company/${idCompany}`,{})
    }
    

     guardarCategoria(data:any):Observable<any>{
        
        return this.http.post(`${this.APIURL}/category`,
            {
                name:data.name
            }
        )
    }
     guardarCompany(data:any,id:any):Observable<any>{
        
        return this.http.post(`${this.APIURL}/company/category/${id}`,
            {
                'name':data.name,
                'description':data.description,
                'address':data.address,
                'logo':data.logo,
                'img':data.img
            }
        )
    }


    


   

} 
