import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Entities/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  tempProducts: Product[] = [];

  constructor() { 
    this.products = [
      new Product(1,"مغسلة صحون",3.4,7,"فعال"),
      new Product(2," عطر ",3.4,20,"فعال"),
      new Product(3,"ساعة",3.4,7,"فعال"),
      new Product(4,"جهاز تفريغ الهواء",3.4,7,"فعال")

    ]
    this.tempProducts = this.products;

  }

  filterTable(event: any) {
    this.tempProducts = this.products.filter((obj) => {
      return obj.getTitle().includes(event.target.value);
    });
    if (event.target.value == "") this.tempProducts = this.products;
  }


  ngOnInit(): void {
  }

}
