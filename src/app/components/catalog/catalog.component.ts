import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Modal } from 'bootstrap';
import * as saveAs from 'file-saver';
import * as JSZip from 'jszip';
import {  Catalog, Image } from 'src/app/Entities/Catalog';
import { CatalogService } from 'src/app/services/catalog.service';
import { Alert } from 'src/app/utils/Alert';
import { CacheManager } from 'src/app/utils/CasheManager';
import { SnakBar } from 'src/app/utils/SnakBar';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  private catalogs: Catalog[] = [];
  private tempFilteredCatalogs: Catalog[] = [];
  private isFiltered: Boolean = false;
  private NUMBER_OF_CARDS_PAIR_PAGE = 12;
  private currentSelectedPage = 1;
  private modalElement: HTMLElement | undefined;
  private modalComponent: Modal | undefined;
  private modalProductSku = "";
  private globalcatalogService: CatalogService;
  private alert = new Alert();
  private snakbar: MatSnackBar;
  tempCatalogs: Catalog[] = [];
  pages: number = 0;

  constructor(catalogService: CatalogService, snackBar: MatSnackBar) {
    this.snakbar = snackBar;
    this.globalcatalogService = catalogService;
    CacheManager.getInstance().isLogin = true;
    CacheManager.getInstance().isAdmin = false;
  }

  createPagination(pages: number, page: number) {
    let str = document.createElement("ul")
    str.className = "pagination-list pagination"
    let active;
    let pageCutLow = page - 1;
    let pageCutHigh = page + 1;
    if (page > 1) {
      str.appendChild(this.createElement(pages, "page-item previous no pagination-item", "pagination-link page-link", 'page_' + (page - 1), "Previous", (page - 1)))
    }

    if (pages < 6) {
      for (let p = 1; p <= pages; p++) {
        active = page == p ? "active" : "no";
        str.appendChild(this.createElement(pages, active + " page-item  pagination-item", "pagination-link page-link", 'page_' + p, p.toString(), p))
      }
    }

    else {
      if (page > 2) {
        str.appendChild(this.createElement(pages, "no page-item pagination-item", "pagination-link page-link", 'page_' + 1, "1", 1))
        if (page > 3) {
          str.appendChild(this.createElement(pages, "out-of-range pagination-item", "pagination-link page-link", 'page_' + (page - 2), "...", (page - 2)))
        }
      }

      if (page === 1) {
        pageCutHigh += 2;
      } else if (page === 2) {
        pageCutHigh += 1;
      }

      if (page === pages) {
        pageCutLow -= 2;
      } else if (page === pages - 1) {
        pageCutLow -= 1;
      }

      for (let p = pageCutLow; p <= pageCutHigh; p++) {
        if (p === 0) {
          p += 1;
        }
        if (p > pages) {
          continue
        }
        active = page == p ? "active" : "no";
        str.appendChild(this.createElement(pages, "page-item pagination-item" + " " + active, "pagination-link page-link", 'page_' + p, p.toString(), p))
      }

      if (page < pages - 1) {
        if (page < pages - 2) {
          str.appendChild(this.createElement(pages, "out-of-range pagination-item", "pagination-link page-link", 'page_' + (Number(page) + 2), "...", Number(page) + 2))
        }
        str.appendChild(this.createElement(pages, "page-item no pagination-item", "pagination-link page-link", 'page_' + pages, pages.toString(), pages))
      }
    }

    if (page < pages) {
      str.appendChild(this.createElement(pages, "page-item next no pagination-item", "pagination-link page-link", 'page_' + (Number(page) + 1), "Next", (Number(page) + 1)))
    }

    var pagination: HTMLDivElement = document.getElementById('pagination') as HTMLDivElement
    pagination.innerHTML = ''
    pagination.appendChild(str)
    return str;
  }

  private createElement(pages: number, liclasses: string, aclasses: string, aId: string, aText: string, createPaginationSecondParameter: number): HTMLLIElement {
    let li = document.createElement("li");
    li.className = liclasses
    if (aText == "Next") {
      let i = document.createElement("i");
      li.id = "next"
      i.className = "bi bi-arrow-left-short " + aclasses
      i.id = aId;
      i.addEventListener('click', () => {
        this.createPagination(pages, createPaginationSecondParameter)
        this.page_onclick(event)
      })
      li.appendChild(i);
    }
    else if (aText == "Previous") {
      li.id = "prev"
      let i = document.createElement("i");
      i.className = "bi bi-arrow-right-short " + aclasses
      i.id = aId;
      i.addEventListener('click', () => {
        this.createPagination(pages, createPaginationSecondParameter)
        this.page_onclick(event)
      })
      li.appendChild(i);
    }
    else {
      let a = document.createElement("a")
      a.className = aclasses
      a.id = aId
      a.innerText = aText
      a.addEventListener('click', () => {
        this.createPagination(pages, createPaginationSecondParameter)
        this.page_onclick(event)
      })
      li.appendChild(a);
    }
    return li;
  }

  page_onclick(event: any) {
    if (!(this.isFiltered)) {
      this.currentSelectedPage = event.target.id.split("_")[1];
      this.displayCards(this.catalogs, (this.currentSelectedPage - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE)
    }
    else {
      if (this.isFiltered && this.tempFilteredCatalogs.length != 0) {
        this.tempCatalogs = this.tempFilteredCatalogs

      }
      this.createPagination(Math.ceil(this.tempCatalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), event.target.id.split("_")[1]);
      this.displayCards(this.tempCatalogs, (event.target.id.split("_")[1] - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE)
    }
  }

  displayCards(data_: Catalog[], start: number, lenght: number) {

    if (data_.length == 0) {
      return;
    }
    if (data_.length <= start + lenght) {
      this.drowCards(start, data_.length)
    } else {
      this.drowCards(start, start + lenght)
    }
  }

  drowCards(start: number, end: number) {
    if (!(this.isFiltered)) {
      this.tempCatalogs = [];
      for (var i = start; i < end; i++) {
        this.tempCatalogs.push(this.catalogs[i]);
      }
    }
    else {
      this.tempFilteredCatalogs = this.tempCatalogs
      this.tempCatalogs = [];
      for (var i = start; i < end; i++) {
        this.tempCatalogs.push(this.tempFilteredCatalogs[i]);
      }
    }

  }

  filterCatalogs(event: any) {
    if (event.target.value == "") {
      this.tempCatalogs = this.catalogs;
      this.isFiltered = false;
      this.createPagination(Math.ceil(this.catalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), this.currentSelectedPage);
      this.displayCards(this.catalogs, (this.currentSelectedPage - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE);
      return;
    } else {
      this.isFiltered = true;
      this.tempCatalogs = this.catalogs.filter((obj) => {
        return obj.name.includes(event.target.value);
      });
      this.createPagination(Math.ceil(this.tempCatalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), 1);
      this.displayCards(this.tempCatalogs, 0, this.NUMBER_OF_CARDS_PAIR_PAGE);
    }
  }

  filterSpecialCatalogs(event: any) {
    if (!event.target.checked) {
      this.tempCatalogs = this.catalogs;
      this.isFiltered = false;
      this.createPagination(Math.ceil(this.catalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), this.currentSelectedPage);
      this.displayCards(this.catalogs, (this.currentSelectedPage - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE);
      return;
    }
    else {
      this.isFiltered = true;
      this.tempCatalogs = this.catalogs.filter((obj) => {
        return obj.markAsSpecial;
      });
      this.createPagination(Math.ceil(this.tempCatalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), 1);
      this.displayCards(this.tempCatalogs, 0, this.NUMBER_OF_CARDS_PAIR_PAGE);
    }
  }

  openModal(event: any) {
    this.modalProductSku = event?.target.id
    this.fillModal(this.modalProductSku)
    this.modalElement = document.getElementById('modal') as HTMLElement;
    this.modalComponent = new Modal(this.modalElement);
    this.modalComponent.show();
    this.setImagesEvent();
  }

  private fillModal(sku: string) {
    var a = this.catalogs.filter((obj) => {
      return obj.sku == sku;
    })[0];

    (document.getElementById("sku") as HTMLTableCellElement).innerText = a.sku.toString();
    (document.getElementById("siling") as HTMLTableCellElement).innerText = a.suggestedPrice.toString() + " د.أ";
    (document.getElementById("orginal") as HTMLTableCellElement).innerText = a.original ? 'نعم' : 'لا';
    (document.getElementById("description") as HTMLTextAreaElement).value = a.description.toString();
    (document.getElementById("title") as HTMLHeadingElement).innerText = a.name.toString();
    (document.getElementById("cost") as HTMLHeadingElement).innerText = a.costPrice.toString() + " د.أ";

    if (a.weight != 0 && a.weight != null) {
      (document.getElementById("wtr") as HTMLTableCellElement).style.display = "block";
      (document.getElementById("wieght") as HTMLTableCellElement).innerText = a.weight.toString() + " كغ";
    }
    if (a.dimension != "" && a.dimension != null) {
      (document.getElementById("dimentionsRow") as HTMLTableCellElement).style.display = "block";
      (document.getElementById("dimentions") as HTMLTableCellElement).innerText = a.dimension.toString() + " سم";
    }

    if (a.madeIn != "" && a.madeIn != null) {
      (document.getElementById("madeInTr") as HTMLTableCellElement).style.display = "block";
      (document.getElementById("place") as HTMLTableCellElement).innerText = a.madeIn.toString();
    }

    if (a.quality != "" && a.quality != null) {
      (document.getElementById("qualityRow") as HTMLTableCellElement).style.display = "block";
      (document.getElementById("quality") as HTMLTableCellElement).innerText = a.quality.toString();
    }

    if (a.warranty != "" && a.warranty != null) {
      (document.getElementById("quarantyRow") as HTMLTableCellElement).style.display = "block";
      (document.getElementById("quaranty") as HTMLTableCellElement).innerText = a.warranty.toString();
    }

    if (a.marketingVideoUrl != null && a.marketingVideoUrl != "") {
      (document.getElementById("marketingRow") as HTMLTableRowElement).style.display = 'block';
      (document.getElementById("marketingRowul") as HTMLAnchorElement).href = a.marketingVideoUrl.toString();
    }

    if (a.marketingVideoUrl != null && a.marketingVideoUrl != "") {
      (document.getElementById("totoriulRow") as HTMLTableRowElement).style.display = 'block';
      (document.getElementById("totoriul") as HTMLAnchorElement).href = a.marketingVideoUrl.toString();
    }

    let imagesParent = document.getElementById("catalogImages") as HTMLDivElement;
    let images = imagesParent.childNodes;
    let mainImage = document.getElementById("mainImg") as HTMLImageElement;
    mainImage.src = `data:${a.images[0].type};base64,${a.images[0].image}`;

    for (var i = 1; i < 10; i++) {
      (images[i] as HTMLImageElement).style.display = "none";
    }

    for (var i = 1; i < a.images.length; i++) {
      (images[i] as HTMLImageElement).style.display = "inline";
      if (images[i] != mainImage) {
        (images[i] as HTMLImageElement).src = `data:${a.images[i].type};base64,${a.images[i].image}`;
      }
    }
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

  closeModal() {
    this.modalComponent?.hide();
  }

  filterCategoty(event: any) {
    let id = event.target.id;
    this.setFilterButtonBackground(id);
    switch (id) {
      case "phone": {
        this.filterData("phone");
      } break;

      case "house": {
        this.filterData("house");
      } break;

      case "cosmetic": {
        this.filterData("cosmetic");
      } break;

      case "gaming": {
        this.filterData("gaming");
      } break;

      case "watch": {
        this.filterData("watch");
      } break;

      case "pafrum": {
        this.filterData("pafrum");
      } break;

      case "solar": {
        this.filterData("solar");
      } break;

      case "electricity": {
        this.filterData("electricity");
      } break;

      case "others": {
        this.filterData("others");
      } break;


      case "clear": {
        this.tempCatalogs = this.catalogs;
        this.isFiltered = false;
        this.createPagination(Math.ceil(this.catalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), this.currentSelectedPage);
        this.displayCards(this.catalogs, (this.currentSelectedPage - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE);
      } break;
    }
  }

  private filterData(filterText: string) {
    this.isFiltered = true;
    this.tempCatalogs = this.catalogs.filter((obj) => {
      return obj.categories.includes(filterText)
    });
    this.createPagination(Math.ceil(this.tempCatalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), 1);
    this.displayCards(this.tempCatalogs, 0, this.NUMBER_OF_CARDS_PAIR_PAGE);
  }

  private setFilterButtonBackground(id: string) {
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes;
    for (var i = 0; i < buttonsParent.length; i++) {
      if ((buttonsParent[i].childNodes[0] as HTMLButtonElement).id != "clear")
        (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff";
    }
    if ((document.getElementById(id) as HTMLButtonElement).id != "clear")
      (document.getElementById(id) as HTMLButtonElement).style.background = "#ce0000";

  }

  isCatalogsEmpty(): Boolean {
    return this.tempCatalogs.length == 0;
  }

  getmodalProductSku(): string {
    return this.modalProductSku;
  }

  addToMyProducts(sku: string) {
    this.alert.showSpinner();
    this.globalcatalogService.addToMyProducts(sku).subscribe(res => {
      this.closeModal();
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("s", "تمت اضافة المنتجات", "تمت الاضافة الى منتجاتك بنجاح");

    }, () => {
      this.alert.hideSpinner();
      this.closeModal();
      this.alert.setupAlertDiv("f", "حدث خطأ", "لم تتم الاضافة بنجاح");
    })
  }

  addToCart(sku: string) {
    this.alert.showSpinner();
    this.globalcatalogService.addToMyCart(sku).subscribe(res => {
      this.closeModal();
      this.alert.hideSpinner();

      new SnakBar(this.snakbar).openSnackBar("تمت الاضافة بنجاح")
      //this.alert.setupAlertDiv("s", "تمت اضافة المنتجات", "تمت الاضافة الى سلة مشترياتك بنجاح");

    }, () => {
      this.alert.hideSpinner();
      this.closeModal();
      this.alert.setupAlertDiv("f", "حدث خطأ", "لم تتم الاضافة بنجاح")
    })
  }

  downloadProductImages() {
    var currentProduct = this.catalogs.filter((obj) => {
      return obj.sku == this.modalProductSku;
    })[0];
    const jszip = new JSZip();
    for (let i = 0; i < currentProduct.images.length; i++) {
      var binary = atob(currentProduct.images[i].image.toString());
      var array = [];
      for (let j = 0; j < binary.length; j++) {
        array.push(binary.charCodeAt(j));
      }
      let image = new Blob([new Uint8Array(array)], {
        type: currentProduct.images[i].type
      });
      jszip.file(`${currentProduct.name} ${i + 1}.${currentProduct.images[i].type.split("/")[1]}`, image)
      if (i === (currentProduct.images.length - 1)) {
        jszip.generateAsync({ type: 'blob' }).then(function (content) {
          saveAs(content, currentProduct.name);
        });
      }
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.alert.showSpinner();
    this.globalcatalogService.getProducts().subscribe(res => {
      console.log(res);
      this.catalogs = res;
      this.catalogs = this.catalogs.filter((obj) => {
        return obj.active;
      });
      this.catalogs.reverse();
      this.tempCatalogs = this.catalogs;
      this.pages = Math.ceil(this.catalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE);
      var contentContainer: HTMLDivElement = document.getElementById("contentContainer") as HTMLDivElement;
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
      this.createPagination(Math.ceil(this.catalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), this.currentSelectedPage);
      this.displayCards(this.catalogs, 0, this.NUMBER_OF_CARDS_PAIR_PAGE);

    }, () => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }
}