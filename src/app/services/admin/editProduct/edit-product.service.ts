import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';
import { EditProductRequest } from 'src/app/Entities/admin/EditProductRequest';

@Injectable({
  providedIn: 'root'
})
export class EditProductService {

  constructor(private http: HttpClient) { }

  getProductBySky(sku: string | undefined): Observable<any> {
    return this.http.get(Constants.baseUrl + `/admin/products/${sku}`);
  }

  editProduct(request: EditProductRequest) {
    return this.http.patch(Constants.baseUrl + "/admin/products/", request)
  }
}