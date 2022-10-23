import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Entities/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  tempOrders: Order[] = [];
  constructor() {
    this.orders = [
      new Order(1, "12/10/2022", "owies", 12,"https://www.google.com/", "قيد التسليم" , 12, "قيد التسليم","#FFB959"),
      new Order(2, "12/10/2022", "ahmed", 12,"https://www.google.com/",  "مكتملة", 12, "مكتملة","#67CFA2"),
      new Order(3, "12/10/2022", "abdullah", 12,"https://www.google.com/",  "ملغية", 12, "ملغية","#CE0000"),
      new Order(5, "12/10/2022", "noor", 12,"https://www.google.com/",  "sasa", 12, "معلقة","#FC7383"),
      new Order(6, "12/10/2022", "ali", 12,"https://www.google.com/","sasa", 12, "معلقة","#FC7383"),
    ];
    this.tempOrders = this.orders;
  }

  filterTable(event: any) {
    this.tempOrders = this.orders.filter((obj) => {
      return obj.getCustomerName().includes(event.target.value);
    });
    if (event.target.value == "") this.tempOrders = this.orders;
  }

  ngOnInit(): void {}
}