import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Entities/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: Cart[] = [];


  constructor() {
    this.cartData = [
      new Cart(1, "../../../assets/cat1.jpeg", "ساعه ذكية", 10, 15),
      new Cart(2, "../../../assets/cat1.jpeg", "ساعه ذكية", 10, 15),
      new Cart(3, "../../../assets/cat1.jpeg", "ساعه ذكية", 10, 15),
      new Cart(4, "../../../assets/cat1.jpeg", "ساعه ذكية", 10, 15),
      new Cart(5, "../../../assets/cat1.jpeg", "ساعه ذكية", 10, 15)
    ];
  }

  calculations(event: any) {
    var quntities: HTMLCollection = document.getElementsByClassName("qantity");
    var sells: HTMLCollection = document.getElementsByClassName("sell");
    var id = event.target.id.split(',')[1];
    var sellingPrice: HTMLInputElement = (document.getElementById("sellingPrice," + id)) as HTMLInputElement
    var quantity: HTMLInputElement = (document.getElementById("qantity," + id)) as HTMLInputElement
    var total: HTMLParagraphElement = (document.getElementById("totalValue," + id)) as HTMLParagraphElement

    if (sellingPrice.value == '' || sellingPrice.value == null) {
      total.innerText = "0.000 د.أ"
    }

    else if (quantity.value == '' || quantity.value == null) {
      total.innerText = "0.000 د.أ"
    }

    else {
      var t = Math.round(Number(sellingPrice.value) * Number(quantity.value) * 100) / 100
      total.innerText = t + " د.أ"
      var totalCost = 0;
      for (var i = 0; i < quntities.length; i++) {
        totalCost += Number((quntities[i] as HTMLInputElement).value) * this.cartData[i].getCost()
      }

      ((document.getElementById("totalCost")) as HTMLSpanElement).innerText = Math.round(Number(totalCost) * 100) / 100
        + " د.أ"

      //calculate for from customer money 
      var fromCustomer: number = 0;
      for (var i = 0; i < quntities.length; i++) {
        fromCustomer += Number((quntities[i] as HTMLInputElement).value) * Number((sells[i] as HTMLInputElement).value);
      }

      ((document.getElementById("fromCustomer")) as HTMLSpanElement).innerText = Math.round(Number(fromCustomer + 2.75) * 100) / 100 + "د.أ";

      this.calculateProfit();
    }
  }

  calculateProfit() {
    var quntities: HTMLCollection = document.getElementsByClassName("qantity");
    var sells: HTMLCollection = document.getElementsByClassName("sell");
    var totalCost = 0;
    var totalSell = 0;
    for (var i = 0; i < quntities.length; i++) {
      totalSell += Number((quntities[i] as HTMLInputElement).value) * Number((sells[i] as HTMLInputElement).value)
      totalCost += this.cartData[i].getCost();
    }
    ((document.getElementById("your_profit")) as HTMLSpanElement).innerText = Math.round(Number(totalSell - totalCost - 1) * 100) / 100 + "د.أ";
  }

  ngOnInit(): void {
    var total: HTMLSpanElement = (document.getElementById("totalCost")) as HTMLSpanElement

    var totalCost = 0;
    for (var i = 0; i < this.cartData.length; i++) {
      totalCost += this.cartData[i].getCost();
    }

    total.innerText = totalCost.toString() + "د.أ";
    ((document.getElementById("totalCostPlusShiping")) as HTMLSpanElement).innerText = totalCost + 2.75 + "د.أ";


    //from customer
    var fromCustomer_ = 0
    for (var i = 0; i < this.cartData.length; i++) {
      fromCustomer_ += this.cartData[i].getSellingPrice();
    }
    ((document.getElementById("fromCustomer")) as HTMLSpanElement).innerText = fromCustomer_ + 2.75 + "د.أ";


    //profit
    ((document.getElementById("your_profit")) as HTMLSpanElement).innerText = fromCustomer_ - totalCost - 1 + "د.أ";




  }
}
