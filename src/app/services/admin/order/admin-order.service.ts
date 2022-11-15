import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';
import { AdminActionRequest } from 'src/app/Entities/admin/AdminOrderActionRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get(Constants.baseUrl + "/admin/orders");
  }

  changeStatus(request: AdminActionRequest): Observable<any> {
    return this.http.patch(Constants.baseUrl + '/admin/orders/status', request);

  }
}