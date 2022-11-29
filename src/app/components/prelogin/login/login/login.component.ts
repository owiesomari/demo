import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/Entities/prelogin/LoginRequest';
import { LoginService } from 'src/app/services/prelogin/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  globalLoginService: LoginService;

  constructor(private router: Router, loginService: LoginService) {
    this.globalLoginService = loginService;
  }

  signin() {
    let request = new LoginRequest();
    request.userName = (document.getElementById("loginUsername") as HTMLInputElement).value;
    request.password = (document.getElementById("loginPassword") as HTMLInputElement).value;

    this.globalLoginService.login(request).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl("/dashboard")
    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
    scrollTo(0, 0);
  }
}
