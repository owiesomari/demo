import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketers-details',
  templateUrl: './marketers-details.component.html',
  styleUrls: ['./marketers-details.component.css']
})
export class MarketersDetailsComponent implements OnInit {

  constructor() { }
  viewMode="";
  ngOnInit(): void {
    this.viewMode = "tab1";

  }

}
