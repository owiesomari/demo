import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {


  constructor(private http: HttpClient) { }

  //testing -- remove it

  getProducts(): Observable<any> {
    return this.http.get("https://dropphi.herokuapp.com/dropphi/admin/products");
  }

  addToMyProducts(sku: string): Observable<any> {
    return this.http.post(Constants.baseUrl + `/marketers/products/${sku}`, "")
  }

  addToMyCart(sku: string): Observable<any> {
    return this.http.post(Constants.baseUrl + `/marketers/cart/${sku}`, "")
  }
}
