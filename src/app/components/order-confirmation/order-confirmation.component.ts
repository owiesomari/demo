import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheManager } from 'src/app/utils/CasheManager';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private router: Router) { 
    CacheManager.getInstance().isLogin = true;
    CacheManager.getInstance().isAdmin = false;
  }

  navigateToCatalogs() {
    this.router.navigateByUrl('/orders')
  }
  
  ngOnInit(): void {
  }

}
