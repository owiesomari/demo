import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';


@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {

  constructor( private http :HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get(Constants.baseUrl + "/admin/products")
  }
}
