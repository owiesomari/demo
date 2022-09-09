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
      new Order(1, new Date(), "owies", 12, "sas", "sasa", 12, "sa"),
      new Order(2, new Date(), "ahmed", 12, "sas", "sasa", 12, "sa"),
      new Order(3, new Date(), "abdullah", 12, "sas", "sasa", 12, "sa"),
      new Order(4, new Date(), "khalid", 12, "sas", "sasa", 12, "sa"),
      new Order(5, new Date(), "noor", 12, "sas", "sasa", 12, "sa"),
      new Order(6, new Date(), "ali", 12, "sas", "sasa", 12, "sa"),
    ];
    this.tempOrders = this.orders;
  }

  filterTable(event: any) {
    this.tempOrders = this.orders.filter((obj) => {
      return obj.getCustomerName().includes(event.target.value);
    });
    if (event.target.value == "") this.tempOrders = this.orders;
  }

  ngOnInit(): void { }
}