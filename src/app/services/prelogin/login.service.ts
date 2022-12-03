import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';
import { LoginRequest } from 'src/app/Entities/prelogin/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest): Observable<any> {
    const headers = new HttpHeaders({ "Authorization": 'Basic ' + btoa(request.userName + ":" + request.password) });
    return this.http.post(Constants.baseUrl + "/auth/login", "", { headers })
  }
}