import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from '../utils/Constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http :HttpClient) { }

  getDashboardData():Observable<any>{
    return this.http.get(Constants.baseUrl +"/marketers/dashboard")
  }
}
