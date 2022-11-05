import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get(new Constants().baseUrl + "/marketers/orders");
  }

  deleteOrder(orderNumber: string, reson: string): Observable<any> {
    return this.http.delete(new Constants().baseUrl + "/marketers/orders/" + orderNumber, { body: { "cancellationReason": reson } });
  }
}