import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './classes/IProducts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {
  private _url:string="./assets/data/products.json";
  constructor(private _http: HttpClient) { }

  getProducts():Observable<IProduct[]>
  {
    return this._http.get<IProduct[]>(this._url)
  }
}