import { Component, OnInit } from '@angular/core';
import { Image, ProductRequest } from 'src/app/Entities/admin/ProductRequest';
import { AdminProductService } from 'src/app/services/admin/product/admin-product.service';
import { Alert } from 'src/app/utils/Alert';
import { Utils } from 'src/app/utils/utils';
import { Validator } from 'src/app/utils/Valitator';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private title: HTMLInputElement | undefined
  private category: HTMLSelectElement | undefined
  private costOnDroppi: HTMLInputElement | undefined
  private costOnMarketer: HTMLInputElement | undefined
  private sellPrice: HTMLInputElement | undefined
  private discountPrice: HTMLInputElement | undefined
  private count: HTMLInputElement | undefined
  private filterMarketers: HTMLInputElement | undefined
  private show: HTMLInputElement | undefined
  private isSpecial: HTMLInputElement | undefined
  private description: HTMLTextAreaElement | undefined
  private sku: HTMLInputElement | undefined
  private wieght: HTMLInputElement | undefined
  private shipFrom: HTMLSelectElement | undefined
  private time: HTMLInputElement | undefined
  private woranty: HTMLInputElement | undefined
  private countryOfMini: HTMLInputElement | undefined
  private origin: HTMLInputElement | undefined
  private quarinty: HTMLInputElement | undefined
  private color: HTMLInputElement | undefined
  private brand: HTMLInputElement | undefined
  private dimentions: HTMLInputElement | undefined
  private video1: HTMLInputElement | undefined
  private video2: HTMLInputElement | undefined
  private limeted: HTMLInputElement | undefined
  private request: ProductRequest = new ProductRequest();

  private globalProductService: AdminProductService;
  private imgs: Image[] = [];
  private alert = new Alert();
  private validator: Validator = new Validator();


  constructor(productService: AdminProductService) {
    this.globalProductService = productService;
  }

  addProduct() {
    debugger
    if (this.validateForm()) {
      this.fillRequest()
      this.alert.showSpinner();
      this.globalProductService.addProduct(this.request).subscribe(res => {
        this.alert.hideSpinner();
        this.alert.setupAlertDiv("s", "تمت بنجاح", "تم اضافة المنتج بنجاح");
        Utils.refreshFterOneSecond();
      }, err => {
        this.alert.hideSpinner();
        this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
      })
    }
  }

  private fillRequest() {
    this.request.name = this.title!.value
    this.fillCataegories()
    this.request.costPriceOnDropphi = Number(this.costOnDroppi!.value);
    this.request.costPrice = Number(this.costOnMarketer?.value);
    this.request.suggestedPrice = Number(this.sellPrice?.value);
    this.request.discountPrice = Number(this.discountPrice?.value);
    this.request.stock = Number(this.count?.value);
    this.request.weight = Number(this.wieght!.value);
    this.request.marketers = ["123", "456"];
    this.request.show = this.show!.checked;
    this.request.active = this.show!.checked;
    this.request.markAsSpecial = this.isSpecial!.checked;
    this.request.description = this.description!.value;
    this.request.sku = this.sku!.value;
    this.request.warranty = this.woranty!.value;
    this.request.madeIn = this.countryOfMini!.value;
    this.request.original = this.origin!.checked;
    this.request.quality = this.quarinty!.value;
    this.request.color = this.color!.value;
    this.request.brand = this.brand!.value;
    this.request.dimension = this.dimentions!.value;
    this.request.tutorialVideoUrl = this.video1!.value;
    this.request.marketingVideoUrl = this.video2!.value;
    this.request.images = this.imgs;
    this.request.shippedFrom = this.shipFrom!.value;
    this.request.preparationPeriod = this.time!.value;
    this.request.limited = this.limeted!.checked;
    debugger
  }

  private fillCataegories(){
    let result: string[] = [];
    let option;
    for (let i = 0; i < this.category!.options.length; i++) {
      option = this.category!.options[i];
      if (option.selected) {
        result.push(option.value || option.text);
      }
    }
    this.request.categories = result;
  }

  private fillImages(files: any) {
    this.imgs = [];
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue;
      const picReader = new FileReader();
      picReader.addEventListener("load", (event) => {
        let img: Image = new Image();
        const picFile = event.target;
        img.image = picFile?.result?.toString().split(";")[1].split(",")[1];
        img.type = picFile?.result?.toString().split(";")[0].split(":")[1];
        img.name = "image" + (i + 1);
        this.imgs.push(img);
      });
      picReader.readAsDataURL(files[i]);
    }
  }

  private validateForm(): Boolean {
    if (this.validator.isElementEmpty(this.title) || this.description?.value == "" ||
      this.validator.isElementEmpty(this.costOnDroppi) || this.validator.isElementEmpty(this.costOnMarketer) ||
      this.validator.isElementEmpty(this.sellPrice) || this.validator.isElementEmpty(this.sku) ||
      this.validator.isElementEmpty(this.sku)) {
      return false;
    }
    return true;
  }


  ngOnInit(): void {

    this.title = document.getElementById("productTitle") as HTMLInputElement
    this.category = document.getElementById("category") as HTMLSelectElement
    this.costOnDroppi = document.getElementById("costOnDroppi") as HTMLInputElement
    this.costOnMarketer = document.getElementById("costOnMarketer") as HTMLInputElement
    this.sellPrice = document.getElementById("sellPrice") as HTMLInputElement
    this.discountPrice = document.getElementById("discountPrice") as HTMLInputElement
    this.count = document.getElementById("count") as HTMLInputElement
    this.filterMarketers = document.getElementById("filterMarketers") as HTMLInputElement
    this.show = document.getElementById("show") as HTMLInputElement
    this.isSpecial = document.getElementById("isSpecial") as HTMLInputElement
    this.description = document.getElementById("productDescription") as HTMLTextAreaElement
    this.sku = document.getElementById("productSku") as HTMLInputElement
    this.wieght = document.getElementById("productWieght") as HTMLInputElement
    this.shipFrom = document.getElementById("shipFrom") as HTMLSelectElement
    this.time = document.getElementById("time") as HTMLInputElement
    this.woranty = document.getElementById("woranty") as HTMLInputElement
    this.countryOfMini = document.getElementById("countryOfMini") as HTMLInputElement
    this.origin = document.getElementById("origin") as HTMLInputElement
    this.quarinty = document.getElementById("quarinty") as HTMLInputElement
    this.color = document.getElementById("color") as HTMLInputElement
    this.brand = document.getElementById("brand") as HTMLInputElement
    this.dimentions = document.getElementById("productDimentions") as HTMLInputElement
    this.video1 = document.getElementById("video1") as HTMLInputElement
    this.video2 = document.getElementById("video2") as HTMLInputElement
    this.limeted = document.getElementById("limeted") as HTMLInputElement


    (document.querySelector("#files") as HTMLInputElement).addEventListener("change", (e: any) => {

      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const files = e.target.files;
        const output = document.querySelector("#result") as HTMLOutputElement;
        output.innerHTML = "";
        this.fillImages(files);
        for (let i = 0; i < files.length; i++) {
          if (!files[i].type.match("image")) continue;
          const picReader = new FileReader();
          picReader.addEventListener("load", function (event) {
            const picFile = event.target;
            const div = document.createElement("div");
            div.innerHTML = `<img class="thumbnail" width='100' hight='100' src="${picFile?.result}""/>`;
            output.appendChild(div);
          });
          picReader.readAsDataURL(files[i]);
        }
      } else {
        alert("Your browser does not support File API");
      }
    });
  }
}

class ProductImage {
  image: string | undefined = "";
  title: string | undefined = "";
  type: string | undefined = "";
}

