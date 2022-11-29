import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  navigateToSignup(){
    this.router.navigateByUrl("/registration")
  }

  ngOnInit(): void {
    scrollTo(0,0);
  }

}
