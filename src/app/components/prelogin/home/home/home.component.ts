import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CacheManager } from 'src/app/utils/CasheManager';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
    CacheManager.getInstance().isLogin = false;
    CacheManager.getInstance().isAdmin = false;
  }

  navigateToSignup() {
    this.router.navigateByUrl("/registration")
  }

  ngOnInit(): void {
    scrollTo(0, 0);
  }

}
