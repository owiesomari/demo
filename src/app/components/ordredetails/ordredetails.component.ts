import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-ordredetails',
  templateUrl: './ordredetails.component.html',
  styleUrls: ['./ordredetails.component.css']
})
export class OrdredetailsComponent implements OnInit {

  orderNumber: string | undefined = "0"

  constructor(private _Activatedroute: ActivatedRoute) {
    this.orderNumber = this._Activatedroute.snapshot.paramMap.get("order_number")?.toString()
  }

  getOrderNumber(): string | undefined { return this.orderNumber }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
