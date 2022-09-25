import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Catalog } from 'src/app/Entities/Catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalogs: Catalog[] = [];
  isFiltered: Boolean = false;
  NUMBER_OF_CARDS_PAIR_PAGE = 12;
  currentSelectedPage = 1;
  pages: number = 0;
  tempCatalogs: Catalog[] = [];
  tempFilteredCatalogs: Catalog[] = [];
  modalElement: HTMLElement | undefined
  modalComponent :Modal | undefined

  constructor() {
    this.catalogs = [
      new Catalog(1, "../../assets/cat1.jpeg", "منتج رقم ١", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "منتج رقم 2", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 3", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 4", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 5", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 6", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 7", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 8", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 9", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 10", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 11", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 12", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 13", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 14", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 15", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 16", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 17", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 18", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم19 ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 20", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 21", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 22", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 23", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 24", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 25", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 26", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 27", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 28", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 29", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "آويس العمري ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", "منتج رقم ١", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "منتج رقم 2", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 3", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 4", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 5", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 6", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 7", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 8", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 9", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 10", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 11", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 12", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 13", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 14", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 15", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 16", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 17", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 18", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم19 ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 20", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 21", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 22", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 23", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 24", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 25", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 26", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 27", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 28", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 29", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "آويس العمري ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", "منتج رقم ١", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "منتج رقم 2", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 3", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 4", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 5", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 6", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 7", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 8", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 9", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 10", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 11", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 12", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 13", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 14", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 15", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 16", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 17", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 18", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم19 ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 20", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 21", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 22", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 23", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 24", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", " منتج رقم 25", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", " منتج رقم 26", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", " منتج رقم 27", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", " منتج رقم 28", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", " منتج رقم 29", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "آويس العمري ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),

    ];

    this.tempCatalogs = this.catalogs;
    this.pages = Math.ceil(this.catalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE);

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

      //(document.getElementById("prev") as HTMLLIElement).style.display = "none";
      //(document.getElementById("next") as HTMLLIElement).style.display = "none";


      //if (!isFiltered)
      //$("#search_pannel").hide();
      // var emptydiv = "<div class='cont'> <h1>No data to display!</h1></div>"
      // $("#main").html(emptydiv);
      return;
    } else {
      //  (document.getElementById("prev") as HTMLLIElement).style.display = "block";
      //(document.getElementById("next") as HTMLLIElement).style.display = "block";
      //$("#prev").show();
      //$("#next").show();
      // $("#search_pannel").show();
    }

    if (data_.length <= start + lenght) {
      this.drowCards(start, data_.length)
    } else {
      this.drowCards(start, start + lenght)
    }
  }

  drowCards(start: number, end: number) {
    debugger
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
    }
    else {
      this.isFiltered = true;
      this.tempCatalogs = this.catalogs.filter((obj) => {
        return obj.getTitle().includes(event.target.value);
      });
      this.createPagination(Math.ceil(this.tempCatalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), 1);
      this.displayCards(this.tempCatalogs, 0, this.NUMBER_OF_CARDS_PAIR_PAGE);
    }
  }

  openModal() {
    this.modalElement = document.getElementById('modal') as HTMLElement;
    this.modalComponent = new Modal(this.modalElement);
    this.modalComponent.show();
  }

  closeModal(){
    this.modalComponent?.hide();

  }

  ngOnInit(): void {
    this.createPagination(Math.ceil(this.catalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE), this.currentSelectedPage);
    this.displayCards(this.catalogs, 0, this.NUMBER_OF_CARDS_PAIR_PAGE);
    this.openModal()
  }
}