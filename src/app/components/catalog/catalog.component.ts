import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { AllProduct, Catalog } from 'src/app/Entities/Catalog';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalogs: Catalog = new Catalog();
  isFiltered: Boolean = false;
  NUMBER_OF_CARDS_PAIR_PAGE = 12;
  currentSelectedPage = 1;
  pages: number = 0;
  tempCatalogs: AllProduct[] = [];
  tempFilteredCatalogs: AllProduct[] = [];
  modalElement: HTMLElement | undefined
  modalComponent: Modal | undefined
  modalProductSku = ""

  constructor(catalogService: CatalogService) {

    catalogService.getProducts().subscribe(res => {
      console.log(res)

    }, err => {

      console.log(err)
    })

    var p1 = new AllProduct()
    p1.name = "owies";
    p1.category = "phone"
    p1.costPrice = 20
    p1.sellPrice = 30
    p1.suggestedPrice = 25
    p1.discountPrice = 15
    p1.stock = 30
    p1.show = true
    p1.markAsSpecial = true
    //marketers:         string[];
    p1.description = "fdghhfdgfdsfsd\ngfdsfsfdsf\negffefewsdf\netfwfswf"
    p1.sku = "123"
    p1.weight = 12
    p1.images = []
    p1.warranty = "dsfa"
    p1.madeIn = "jordan"
    p1.original = true
    p1.quality = "fdsf"
    p1.color = "red"
    p1.brand = "fsdfds"
    p1.dimension = "wdsa"
    p1.marketingVideoUrl = "213"
    p1.tutorialVideoUrl = "3131"
    p1.active = true

    var p2 = new AllProduct()
    p2.name = "omari";
    p2.category = "watch"
    p2.costPrice = 20
    p2.sellPrice = 30
    p2.suggestedPrice = 25
    p2.discountPrice = 15
    p2.stock = 30
    p2.show = true
    p2.markAsSpecial = true
    //marketers:         string[];
    p2.description = "fdghhfdgfdsfsd\ngfdsfsfdsf\negffefewsdf\netfwfswf"
    p2.sku = "456"
    p2.weight = 12
    p2.images = []
    p2.warranty = "٣ اشهر"
    p2.madeIn = "jordan"
    p2.original = true
    p2.quality = "fdsf"
    p2.color = "red"
    p2.brand = "fsdfds"
    p2.dimension = "wdsa"
    p2.marketingVideoUrl = "213"
    p2.tutorialVideoUrl = "3131"
    p2.active = true


    for(var i =0;i<100;i++){
    this.catalogs.allProducts.push(p1);
    this.catalogs.allProducts.push(p2);
    }

    this.tempCatalogs = this.catalogs.allProducts;
    this.pages = Math.ceil(this.catalogs.allProducts.length / this.NUMBER_OF_CARDS_PAIR_PAGE);

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
      this.displayCards(this.catalogs.allProducts, (this.currentSelectedPage - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE)
    }
    else {
      if (this.isFiltered && this.tempFilteredCatalogs.length != 0) {
        this.tempCatalogs = this.tempFilteredCatalogs

      }
      this.createPagination(Math.ceil(this.tempCatalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), event.target.id.split("_")[1]);
      this.displayCards(this.tempCatalogs, (event.target.id.split("_")[1] - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE)
    }
  }

  displayCards(data_: AllProduct[], start: number, lenght: number) {

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
        this.tempCatalogs.push(this.catalogs.allProducts[i]);
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
      this.tempCatalogs = this.catalogs.allProducts;
      this.isFiltered = false;
      this.createPagination(Math.ceil(this.catalogs.allProducts.length / this.NUMBER_OF_CARDS_PAIR_PAGE), this.currentSelectedPage);
      this.displayCards(this.catalogs.allProducts, (this.currentSelectedPage - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE);
      return;
    }
    else {
      this.isFiltered = true;
      this.tempCatalogs = this.catalogs.allProducts.filter((obj) => {
        return obj.name.includes(event.target.value);
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
    var a = this.catalogs.allProducts.filter((obj) => {
      return obj.sku == sku;
    })[0];
    (document.getElementById("title") as HTMLHeadingElement).innerText = a.name.toString();
    (document.getElementById("cost") as HTMLHeadingElement).innerText = a.costPrice.toString() + " د.أ";
    (document.getElementById("wieght") as HTMLTableCellElement).innerText = a.weight.toString();
    (document.getElementById("sku") as HTMLTableCellElement).innerText = a.sku.toString();
    (document.getElementById("place") as HTMLTableCellElement).innerText = a.madeIn.toString();
    (document.getElementById("quality") as HTMLTableCellElement).innerText = a.quality.toString();
    (document.getElementById("siling") as HTMLTableCellElement).innerText = a.suggestedPrice.toString() + " د.أ";
    (document.getElementById("quaranty") as HTMLTableCellElement).innerText = a.warranty.toString();//change
    (document.getElementById("orginal") as HTMLTableCellElement).innerText = a.original.toString();
    (document.getElementById("dimentions") as HTMLTableCellElement).innerText = a.dimension.toString();
    (document.getElementById("description") as HTMLTextAreaElement).value = a.description.toString();
    (document.getElementById("totoriul") as HTMLAnchorElement).href = a.marketingVideoUrl.toString();
    (document.getElementById("totoriul") as HTMLAnchorElement).innerHTML = a.marketingVideoUrl.toString();//change

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
        this.filterData("h");
      } break;

      case "cosmetic": {
        this.filterData("c");
      } break;

      case "gaming": {
        this.filterData("g");
      } break;

      case "watch": {
        this.filterData("w");
      } break;

      case "pafrum": {
        this.filterData("p");
      } break;

      case "solar": {
        this.filterData("s");
      } break;

      case "electricity": {
        this.filterData("e");
      } break;

      case "others": {
        this.filterData("o");
      } break;


      case "clear": {
        this.tempCatalogs = this.catalogs.allProducts;
        this.isFiltered = false;
        this.createPagination(Math.ceil(this.catalogs.allProducts.length / this.NUMBER_OF_CARDS_PAIR_PAGE), this.currentSelectedPage);
        this.displayCards(this.catalogs.allProducts, (this.currentSelectedPage - 1) * this.NUMBER_OF_CARDS_PAIR_PAGE, this.NUMBER_OF_CARDS_PAIR_PAGE);
      } break;
    }

  }

  private filterData(filterText: string) {
    this.isFiltered = true;
    this.tempCatalogs = this.catalogs.allProducts.filter((obj) => {
      return obj.category == filterText
    });
    this.createPagination(Math.ceil(this.tempCatalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), 1);
    this.displayCards(this.tempCatalogs, 0, this.NUMBER_OF_CARDS_PAIR_PAGE);
  }

  private setFilterButtonBackground(id: string) {
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      if ((buttonsParent[i].childNodes[0] as HTMLButtonElement).id != "clear")
        (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }
    if ((document.getElementById(id) as HTMLButtonElement).id != "clear")
      (document.getElementById(id) as HTMLButtonElement).style.background = "#ce0000"

  }

  isCatalogsEmpty(): Boolean {
    return this.tempCatalogs.length == 0
  }

  getmodalProductSku(): string {
    return this.modalProductSku
  }

  addToMyProducts(sku: string) {//call api
    console.log(sku)

  }

  addToCart(sku: string) {//call api
    console.log(sku)

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.createPagination(Math.ceil(this.catalogs.allProducts.length / this.NUMBER_OF_CARDS_PAIR_PAGE), this.currentSelectedPage);
    this.displayCards(this.catalogs.allProducts, 0, this.NUMBER_OF_CARDS_PAIR_PAGE);
  }
}