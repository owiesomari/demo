import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(Constants.baseUrl + "/marketers/products/");
  }

  deleteProduct(sku: string): Observable<any> {
    return this.http.delete(Constants.baseUrl + `/marketers/products/${sku}`);
  }

  addToMyCart(sku: string): Observable<any> {
    return this.http.post(Constants.baseUrl + `/marketers/cart/${sku}`, "")
  }
}
