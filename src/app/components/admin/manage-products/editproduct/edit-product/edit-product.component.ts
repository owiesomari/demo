import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EditProductRequest } from 'src/app/Entities/admin/EditProductRequest';
import {  Image, ManageProductsResponse } from 'src/app/Entities/admin/ManageProductsResponse';
import { EditProductService } from 'src/app/services/admin/editProduct/edit-product.service';
import { Alert } from 'src/app/utils/Alert';
import { SnakBar } from 'src/app/utils/SnakBar';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private title!: HTMLInputElement;
  private category!: HTMLSelectElement;
  private costOnDroppi!: HTMLInputElement
  private costOnMarketer!: HTMLInputElement
  private sellPrice!: HTMLInputElement
  private discountPrice!: HTMLInputElement
  private count!: HTMLInputElement
  private filterMarketers!: HTMLInputElement
  private show!: HTMLInputElement
  private isSpecial!: HTMLInputElement
  private description!: HTMLTextAreaElement
  private skuInput!: HTMLInputElement
  private wieght!: HTMLInputElement
  private shipFrom!: HTMLSelectElement
  private time!: HTMLInputElement
  private woranty!: HTMLInputElement
  private countryOfMini!: HTMLInputElement
  private origin!: HTMLInputElement
  private quarinty!: HTMLInputElement
  private color!: HTMLInputElement
  private brand!: HTMLInputElement
  private dimentions!: HTMLInputElement
  private video1!: HTMLInputElement
  private video2!: HTMLInputElement
  private limeted!: HTMLInputElement
  private output !: HTMLOutputElement;
  private snakbar: MatSnackBar;
  alert = new Alert();


  private globalEditProductService: EditProductService;
  private imgs: Image[] = [];
  private product: ManageProductsResponse = new ManageProductsResponse();
  private request: EditProductRequest = new EditProductRequest();

  sku: string | undefined = "";

  constructor(private _Activatedroute: ActivatedRoute, editProductService: EditProductService, snackBar: MatSnackBar) {
    this.sku = this._Activatedroute.snapshot.paramMap.get("sku")?.toString()
    this.globalEditProductService = editProductService;
    this.snakbar=snackBar
  }

  private fillForm() {
    this.title.value = this.product.name;
    for (var i = 0; i < this.category.options.length; i++) {
      this.category.options[i].selected = this.product.categories.indexOf(this.category.options[i].value) >= 0;
    }
    this.costOnDroppi.value = this.product.costPriceOnDropphi.toString();
    this.costOnMarketer.value = this.product.costPrice.toString();
    this.sellPrice.value = this.product.suggestedPrice.toString();
    this.discountPrice.value = this.product.discountPrice.toString();
    this.count.value = this.product.stock.toString();
    this.filterMarketers.value = "";
    this.show.checked = this.product.active;
    this.isSpecial.checked = this.product.markAsSpecial;
    this.description.value = this.product.description;
    this.skuInput.value = this.product.sku;
    this.wieght.value = this.product.weight.toString();
    this.shipFrom.value = this.product.shippedFrom;
    this.time.value = this.product.preparationPeriod;
    this.woranty.value = this.product.warranty;
    this.countryOfMini.value = this.product.madeIn;
    this.origin.checked = this.product.original;
    this.quarinty.value = this.product.quality;
    this.color.value = this.product.color;
    this.brand.value = this.product.brand;
    this.dimentions.value = this.product.dimension;
    this.video1.value = this.product.marketingVideoUrl;
    this.video2.value = this.product.tutorialVideoUrl;
    this.limeted.checked = this.product.limited;
    this.product.images.forEach((image_) => {
      const div = document.createElement("div");
      div.innerHTML = `<img class="thumbnail" width='100' hight='100' src="data:${image_.type};base64,${image_.image}" "/>`;
      this.output.appendChild(div);
    })
  }

  updateProduct() {
    this.fillRequest();
    this.alert.showSpinner();
    debugger
    this.globalEditProductService.editProduct(this.request).subscribe(res => {
      this.alert.hideSpinner();
      new SnakBar(this.snakbar).openSnackBar("تم تعديل المنتج بنجاح","success")
    }, err => {
      this.alert.hideSpinner();
    })

  }

  private fillRequest() {
    this.fillImages();
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
    this.request.newSku = this.skuInput!.value;
    this.request.oldSku = this.sku!;
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
  }

  private fillCataegories() {
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

  private fillImages() {
    let imagesElements = (document.getElementById("result") as HTMLOutputElement).childNodes
    this.imgs = [];
    imagesElements.forEach((div) => {
      (div as HTMLDivElement).childNodes.forEach((image_) => {
        let img: Image = new Image();
        img.image = (image_ as HTMLImageElement).src.toString().split(";")[1].split(",")[1];
        img.type = (image_ as HTMLImageElement).src.split(";")[0].split(":")[1];
        img.name = "image";
        this.imgs.push(img);
      })
    })
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
    this.skuInput = document.getElementById("productSku") as HTMLInputElement
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
    this.output = document.querySelector("#result") as HTMLOutputElement;

    (document.querySelector("#files") as HTMLInputElement).addEventListener("change", (e: any) => {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
          if (!files[i].type.match("image")) continue;
          const picReader = new FileReader();
          picReader.addEventListener("load", (event) => {
            const picFile = event.target;
            const div = document.createElement("div");
            div.innerHTML = `<img class="thumbnail" width='100' hight='100' src="${picFile?.result}""/>`;
            this.output.appendChild(div);
          });
          picReader.readAsDataURL(files[i]);
        }
      } else {
        alert("Your browser does not support File API");
      }
    });

    this.alert.showSpinner();

    this.globalEditProductService.getProductBySky(this.sku).subscribe(res => {
      this.alert.hideSpinner();
      this.product = res;
      this.fillForm();
    }, err => {
      new SnakBar(this.snakbar).openSnackBar("حدث خطأ، الرجاء المحاولة لاحقاً","error")
      this.alert.hideSpinner();
    })
  }
}
