import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Entities/Product';
import { Modal } from 'bootstrap';
import { ProductService } from 'src/app/services/producrs/product.service';
import { Alert } from 'src/app/utils/Alert';

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
  removedProductID: string = ""
  globalProductService: ProductService
  alert = new Alert();

  constructor(productService: ProductService) {
    this.globalProductService = productService;
  }

  filterTable(event: any) {
    this.tempProducts = this.products.filter((obj) => {
      return obj.name.includes(event.target.value);
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
    this.fillModal(event.target.id)
    this.catalogModalElement = document.getElementById('modal') as HTMLElement;
    this.catalogModalComponent = new Modal(this.catalogModalElement);
    this.catalogModalComponent.show();
  }

  private fillModal(sku: string) {
    this.setImagesEvent()
    var a = this.products.filter((obj) => {
      return obj.sku == sku;
    })[0];
    (document.getElementById("title") as HTMLHeadingElement).innerText = a.name;
    (document.getElementById("cost") as HTMLHeadingElement).innerText = a.costPrice.toString() + " د.أ"
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

  closeCatalogModal() {
    this.catalogModalComponent?.hide();
    window.location.reload();
  }

  removeProduct() {
    this.alert.showSpinner();
    this.globalProductService.deleteProduct(this.removedProductID).subscribe(res =>{
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("s", "تمت بنجاح","تم حذف المنتج بنجاح");
      this.hideCloseModal();
    },err =>{
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
      this.hideCloseModal();

    }) //call api and send removedProductID

  }

  getStatusMsg(active: boolean): string {
    return active ? 'فعال' : 'ملغية';
  }

  getStatusColor(active:boolean){
    return active ? '#67CFA2' : '#CE0000';
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.alert.showSpinner();
    this.globalProductService.getProducts().subscribe(res => {
      this.products = res;
      this.tempProducts = this.products;
      var contentContainer: HTMLDivElement = document.getElementById("content_continer") as HTMLDivElement
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
    }, err => {
      this.alert.hideSpinner();
      console.log(err)
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }
}
