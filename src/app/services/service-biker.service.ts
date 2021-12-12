import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError,map,tap } from "rxjs/operators";
import { Observable, of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ServiceBikerService {
  private APIURL:string = environment.APIURL;
  constructor(private http:HttpClient) { }


  obtenerBikersAceptadosActivos():Observable<any>{
    return this.http.get(`${this.APIURL}/bikers/active-accepted`,{})
  }

  obtenerBikers():Observable<any>{
    return this.http.get(`${this.APIURL}/bikers`,{})
  }

  updateBiker(id:any, body:any): Observable<any>{
    const url = `${this.APIURL}/bikers/biker/update/${id}`;
    return this.http.put<any>(url, body,{ observe: "body"});
  }
  
  

}
