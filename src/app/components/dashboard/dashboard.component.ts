import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  idInfoVisibile: Boolean = false;

  constructor() { }

  showDropphiSupport(event: any) {
    this.idInfoVisibile = event.target.checked
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
