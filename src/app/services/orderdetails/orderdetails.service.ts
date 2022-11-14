import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  constructor(private http: HttpClient) {
  }

  getOrderDetails(orderNumber: string): Observable<any> {
    return this.http.get(Constants.baseUrl + "/marketers/orders/" + orderNumber)
  }

  deleteOrder(orderNumber: string, reson: string): Observable<any> {
    return this.http.delete(Constants.baseUrl + "/marketers/orders/" + orderNumber, { body: { "cancellationReason": reson } });
  }
}