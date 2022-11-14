import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/Constants';
import { UserRequest } from 'src/app/Entities/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(Constants.baseUrl + "/admin/users/get-user?user=anonymousUser");
  }

  updateUserInfo(userRequest: UserRequest): Observable<any> {
    return this.http.patch(Constants.baseUrl + `/admin/users/`, userRequest)
  }
}
