import { Component, OnInit } from '@angular/core';
import { CacheManager } from 'src/app/utils/CasheManager';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor() { 
    CacheManager.getInstance().isLogin=false;
    CacheManager.getInstance().isAdmin=false;
  }

  ngOnInit(): void {
    scrollTo(0,0);
  }
}
