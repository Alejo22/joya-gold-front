import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IArchetype, IMaterial } from '../models/joyaGold.model';
import { URLS } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);

  public getMaterials():Observable<IMaterial>{
    return  this.http.get<IMaterial>(`${ URLS.BASE }/${URLS.MATERIAL}`);
  }

  public getArchetypes():Observable<IArchetype>{
    return  this.http.get<IArchetype>(`${ URLS.BASE }/${URLS.ARCHETYPE}`);
  }

  /* products */

  public getProducts():Observable<any>{
    return this.http.get<any>(`${ URLS.BASE }/${URLS.PRODUCT}`);
  }
}
