import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  constructor(private http :HttpClient) { 
  }

  getOrderDetails(orderNumber:string):Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/posts/"+orderNumber)
  }
}
