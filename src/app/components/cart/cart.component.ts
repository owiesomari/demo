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
      new Cart(1,"../../../assets/cat1.jpeg","ساعه ذكية", 10,15),
      new Cart(1,"../../../assets/cat1.jpeg","ساعه ذكية", 10,15),
      new Cart(1,"../../../assets/cat1.jpeg","ساعه ذكية", 10,15),
      new Cart(1,"../../../assets/cat1.jpeg","ساعه ذكية", 10,15),
      new Cart(1,"../../../assets/cat1.jpeg","ساعه ذكية", 10,15)
    ];
  }

  ngOnInit(): void {
  }

}
