import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(Constants.baseUrl + '/admin/products/products/all');
  }

  addToMyProducts(sku: string): Observable<any> {
    return this.http.post(Constants.baseUrl + `/marketers/products/${sku}`, "")
  }

  addToMyCart(sku: string): Observable<any> {
    return this.http.post(Constants.baseUrl + `/marketers/cart/${sku}`, "")
  }
}