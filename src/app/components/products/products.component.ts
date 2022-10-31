import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Entities/Product';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  tempProducts: Product[] = [];
  modalElement: HTMLElement | undefined
  modalComponent: Modal | undefined

  catalogModalElement: HTMLElement | undefined
  catalogModalComponent: Modal | undefined

  removedProductID:string =""

  constructor() { 
    this.products = [
      new Product(1,"../../../assets/cat1.jpeg","مغسلة صحون",3.4,7,"فعال"),
      new Product(2,"../../../assets/cat2.jpeg","مغسلة اواني",9.4,7,"فعال"),
      new Product(3,"../../../assets/cat3.jpeg","مغسلة صحون",3.4,7,"فعال"),
      new Product(4,"../../../assets/cat4.jpeg","مغسلة صحون",3.4,7,"فعال"),

    ]
    this.tempProducts = this.products;

  }

  filterTable(event: any) {
    this.tempProducts = this.products.filter((obj) => {
      return obj.getTitle().includes(event.target.value);
    });
    if (event.target.value == "") this.tempProducts = this.products;
  }

  openModal(event: any) {
    this.removedProductID = event.target.id
    this.modalElement = document.getElementById('close_modal') as HTMLElement;
    this.modalComponent = new Modal(this.modalElement);
    this.modalComponent.show();
  }

  openCatalogModal(event: any) {
    //this.removedProductID = event.target.id
    this.fillModal(event.target.id)
    this.catalogModalElement = document.getElementById('modal') as HTMLElement;
    this.catalogModalComponent = new Modal(this.catalogModalElement);
    this.catalogModalComponent.show();
  }

  private fillModal(id: number) {
    this.setImagesEvent()
    var a = this.products.filter((obj) => {
      return obj.getID() == id;
    })[0];
    (document.getElementById("title") as HTMLHeadingElement).innerText = a.getTitle().toString();
    (document.getElementById("cost") as HTMLHeadingElement).innerText = a.getCost().toString() + " د.أ"
   /*(document.getElementById("wieght") as HTMLTableCellElement).innerText = a.getWeight().toString();
    (document.getElementById("sku") as HTMLTableCellElement).innerText = a.getSKU().toString();
    (document.getElementById("place") as HTMLTableCellElement).innerText = a.getCountryOfManufacture().toString();
    (document.getElementById("quality") as HTMLTableCellElement).innerText = a.getQuality().toString();
    (document.getElementById("siling") as HTMLTableCellElement).innerText = a.getSellingPrice().toString()+ " د.أ";
    (document.getElementById("quaranty") as HTMLTableCellElement).innerText = a.getQuaranty().toString();
    (document.getElementById("orginal") as HTMLTableCellElement).innerText = a.getQuaranty().toString();
    (document.getElementById("dimentions") as HTMLTableCellElement).innerText = a.getDimentions().toString();
    (document.getElementById("description") as HTMLTextAreaElement).value = a.getDiscription().toString();
    (document.getElementById("totoriul") as HTMLAnchorElement).href = a.getTotorial().toString();
    (document.getElementById("totoriul") as HTMLAnchorElement).innerHTML = a.getTotorial().toString();*/

  }

  private setImagesEvent() {
    let imagesParent = document.getElementById("catalogImages") as HTMLDivElement;
    let mainImage = document.getElementById("mainImg") as HTMLImageElement;
    let mainImageSource = mainImage.src;
    let images = imagesParent.childNodes;
    for (var i = 0; i < images.length; i++) {
      if (images[i] != mainImage) {
        images[i].addEventListener('click', function handleClick(event) {
          mainImage.src = (event.target as HTMLImageElement).src;
        });

        images[i].addEventListener('mouseover', (event) => {
          mainImage.src = (event.target as HTMLImageElement).src;

        });

        images[i].addEventListener('mouseout', (event) => {
          mainImage.src = mainImageSource;
        });
      }
    }
  }

  hideCloseModal() {
    this.modalComponent?.hide();
    window.location.reload();

  }

  closeCatalogModal(){
    this.catalogModalComponent?.hide();
    window.location.reload();
  }

  removeProduct(){
    //call api and send removedProductID

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
