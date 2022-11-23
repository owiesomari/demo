import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductRequest } from 'src/app/Entities/admin/ProductRequest';
import { Constants } from 'src/app/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http :HttpClient) { }

  addProduct(request: ProductRequest): Observable<any> {
    return this.http.post(Constants.baseUrl + "/admin/products", request)
  }
}
