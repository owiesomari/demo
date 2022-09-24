import { Component, OnInit } from '@angular/core';

import { Catalog } from 'src/app/Entities/Catalog';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalogs: Catalog[] = [];
  filteredData: Catalog[] = [];
  isFiltered: Boolean = false;
  NUMBER_OF_CARDS_PAIR_PAGE = 5;
  currentSelectedPage = 1;
  private pages: number = 0;

  constructor() {
    this.catalogs = [
      new Catalog(1, "../../assets/cat1.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat1.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat2.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat3.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat4.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),
      new Catalog(1, "../../assets/cat5.jpeg", "مجموعة التحكم 4 في 1 لألعاب الهاتف ", 26, "33", 0.3, "g-g 05", "الصين", "كفالة تشغيلية", "ممتازة", ""),

    ];

    this.pages = Math.ceil(this.catalogs.length / this.NUMBER_OF_CARDS_PAIR_PAGE);

  }

  createPagination(pages: number, page: number) {
    let str = document.createElement("ul")
    str.className = "pagination-list pagination"

    let active;
    let pageCutLow = page - 1;
    let pageCutHigh = page + 1;
    // Show the Previous button only if you are on a page other than the first
    if (page > 1) {
      str.appendChild(this.createElement(pages, "page-item previous no pagination-item", "pagination-link page-link", 'page_' + (page - 1), "Previous", (page - 1)))
    }

    // Show all the pagination elements if there are less than 6 pages total
    if (pages < 6) {
      for (let p = 1; p <= pages; p++) {
        active = page == p ? "active" : "no";
        str.appendChild(this.createElement(pages, active + " page-item  pagination-item", "pagination-link page-link", 'page_' + p, p.toString(), p))
      }
    }
    // Use "..." to collapse pages outside of a certain range
    else {
      // Show the very first page followed by a "..." at the beginning of the
      // pagination section (after the Previous button)
      if (page > 2) {
        str.appendChild(this.createElement(pages, "no page-item pagination-item", "pagination-link page-link", 'page_' + 1, "1", 1))
        if (page > 3) {
          str.appendChild(this.createElement(pages, "out-of-range pagination-item", "pagination-link page-link", 'page_' + (page - 2), "...", (page - 2)))
        }
      }
      // Determine how many pages to show after the current page index
      if (page === 1) {
        pageCutHigh += 2;
      } else if (page === 2) {
        pageCutHigh += 1;
      }
      // Determine how many pages to show before the current page index
      if (page === pages) {
        pageCutLow -= 2;
      } else if (page === pages - 1) {
        pageCutLow -= 1;
      }
      // Output the indexes for pages that fall inside the range of pageCutLow
      // and pageCutHigh
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
      // Show the very last page preceded by a "..." at the end of the pagination
      // section (before the Next button)
      if (page < pages - 1) {
        if (page < pages - 2) {
          str.appendChild(this.createElement(pages, "out-of-range pagination-item", "pagination-link page-link", 'page_' + (Number(page) + 2), "...", Number(page) + 2))
        }
        str.appendChild(this.createElement(pages, "page-item no pagination-item", "pagination-link page-link", 'page_' + pages, pages.toString(), pages))
      }
    }
    // Show the Next button only if you are on a page other than the last
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
      i.className = "bi bi-arrow-left-short " + aclasses
      i.addEventListener('click', () => {
        this.createPagination(pages, createPaginationSecondParameter)
        this.page_onclick()
      })
      li.appendChild(i);
    }
    else if (aText == "Previous") {
      let i = document.createElement("i");
      i.className = "bi bi-arrow-right-short "+ aclasses
      i.addEventListener('click', () => {
        this.createPagination(pages, createPaginationSecondParameter)
        this.page_onclick()
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
        this.page_onclick()
      })
      li.appendChild(a);
    }
    return li;

  }

  page_onclick() {

  }

  ngOnInit(): void {
    this.createPagination(15, this.currentSelectedPage);
  }
}


