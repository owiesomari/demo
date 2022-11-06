import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';
import { CustomerShipmentDetails, OrdersRequest } from 'src/app/Entities/OrdersRequest';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCartData(): Observable<any> {
    return this.http.get(new Constants().baseUrl + `/marketers/cart`);

  }

  ctrateOrder(ordersRequest: OrdersRequest): Observable<any> {
    return this.http.post( new Constants().baseUrl + "/marketers/orders", ordersRequest)
  }

}
