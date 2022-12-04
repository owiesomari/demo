import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/Entities/prelogin/LoginRequest';
import { LoginService } from 'src/app/services/prelogin/login.service';
import { Alert } from 'src/app/utils/Alert';
import { CacheManager } from 'src/app/utils/CasheManager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  globalLoginService: LoginService;
  alert = new Alert();

  constructor(private router: Router, loginService: LoginService) {
    CacheManager.getInstance().isLogin=false;
    CacheManager.getInstance().isAdmin=false;
    this.globalLoginService = loginService;
  }

  signin() {
    let request = new LoginRequest();
    request.userName = (document.getElementById("loginUsername") as HTMLInputElement).value;
    request.password = (document.getElementById("loginPassword") as HTMLInputElement).value;
    this.alert.showSpinner();

    this.globalLoginService.login(request).subscribe(res => {
      this.alert.hideSpinner();
      console.log(res)
      CacheManager.getInstance().isAdmin = res.role == "ADMIN"
      CacheManager.getInstance().isLogin = true;
      this.router.navigateByUrl("/dashboard")
    }, err => {
      this.alert.hideSpinner();
    })
  }

  ngOnInit(): void {
    scrollTo(0, 0);
  }
}
