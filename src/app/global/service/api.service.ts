import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IArchetype, IMaterial, IProduct } from '../models/joyaGold.model';
import { URLS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  public getMaterials():Observable<IMaterial[]>{
    return  this.http.get<IMaterial[]>(`${ URLS.BASE }/${URLS.MATERIAL}`);
  }

  public getArchetypes():Observable<IArchetype[]>{
    return  this.http.get<IArchetype[]>(`${ URLS.BASE }/${URLS.ARCHETYPE}`);
  }

  /* products */

  public getProducts():Observable<any[]>{
    return this.http.get<any[]>(`${ URLS.BASE }/${URLS.PRODUCT}`);
  }

  public saveProduct(product:IProduct):Observable<any>{

    let headers = new HttpHeaders({
      'Content-Type': 'application/json;',
      'Access-Control-Allow-Origin': '*',
    })

    return this.http.post(`${ URLS.BASE }/${URLS.PRODUCT}`,JSON.stringify(product) , { headers });
  }

  public deleteProducts(productId:number):Observable<any>{
    return this.http.delete<any>(`${ URLS.BASE }/${URLS.PRODUCT}/${productId}`);
  }
}
