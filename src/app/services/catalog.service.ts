import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http :HttpClient) { }

  //testing -- remove it

  getProducts():Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/posts")
  }

  addToMyProducts(sku:string) :Observable<any>{
    return this.http.post("https://jsonplaceholder.typicode.com/posts/"+sku,"")
  }

  addToMyCart(sku:string) :Observable<any>{
    return this.http.post("https://jsonplaceholder.typicode.com/posts",sku)
  }
}
