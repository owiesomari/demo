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

   print() 
    {
        var mywindow = window.open('', 'Dropphi', 'height=400,width=600');
        mywindow?.document.write('<html><head><title></title>');
        /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow?.document.write('</head><body >');
        mywindow?.document.write("owies");
        mywindow?.document.write('</body></html>');

        mywindow?.print();
        mywindow?.close();

        return true;
    }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
