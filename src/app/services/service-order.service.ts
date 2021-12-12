import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError,map,tap } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {
  private APIURL:string = environment.APIURL;
  constructor(private http:HttpClient) { }
 
  obtenerOrdenes():Observable<any>{
    return this.http.get(`${this.APIURL}/orders/paid`,{})
}

updateOrder(id:string, body:any): Observable<any>{
  const url = `${this.APIURL}/orders/order/${id}`;
  return this.http.put<any>(url, body,{ observe: "body"});
}



}
