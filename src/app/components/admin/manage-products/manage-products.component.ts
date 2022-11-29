import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManageProductsResponse } from 'src/app/Entities/admin/ManageProductsResponse';
import { ManageProductsService } from 'src/app/services/admin/manageproducts/manage-products.service';
import { Alert } from 'src/app/utils/Alert';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit, AfterViewInit {

  private globalManageProductsService: ManageProductsService
  private products: ManageProductsResponse[] = [];
  alert = new Alert();
  dataSource = new MatTableDataSource<ManageProductsResponse>(this.products);

  displayedColumns: string[] = ['#', 'الصورة', 'الاسم', 'التصنيف', 'سعر التكلفة', 'المخزون', 'حالة المنتج', 'تاريخ الاضافة', 'الاجراءات'];
  constructor(manageProductsService: ManageProductsService) {
    this.globalManageProductsService = manageProductsService;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    (document.getElementsByClassName("mat-paginator-page-size-label"))[0].innerHTML = "عدد المنتجات بالصفحة "
  }

  isProductsEmpty(): Boolean {
    return this.products.length == 0
  }

  getCategoriesNames(categoriesList: string[]): string {
    let categories: string = ""
    categoriesList.forEach((category) => {
      switch (category) {
        case "phone": {
          categories += "هواتف، "
        } break;

        case "house": {
          categories += "ادوات منزلية، "
        } break;

        case "cosmetic": {
          categories += "عناية شخصية، "
        } break;

        case "gaming": {
          categories += "العاب، "
        } break;

        case "watch": {
          categories += "ساعات، "
        } break;

        case "pafrum": {
          categories += "عطور، "
        } break;

        case "solar": {
          categories += "طاقة شمسية، "
        } break;

        case "electricity": {
          categories += "ادوات كهربائية، "
        } break;

        case "others": {
          categories += "اخرى، "
        } break;
      }
    })

    categories = categories.substring(0, categories.length - 2);
    return categories;
  }

  filterTable(event: any) {
    let filterText = (document.getElementById(event.target.id) as HTMLInputElement).value;
    console.log(filterText)
    this.dataSource.data = this.products.filter((obj) => {
      return obj.name.includes(filterText) || obj.sku.includes(filterText);
    });

    if (filterText == "") {
      this.dataSource.data = this.products;
    }
  }

  getStatusMsg(active: boolean): string {
    return active ? 'فعال' : 'ملغية';
  }

  getStatusColor(active: boolean) {
    return active ? '#67CFA2' : '#CE0000';
  }

  getProductNumber(product: ManageProductsResponse): number {
    return this.products.indexOf(product) + 1
  }

  changeToNotActive(element: ManageProductsResponse) {
    element.active = false;
    element.show = false;
    this.updateProduct(element)

  }

  changeToActive(element: ManageProductsResponse) {
    element.active = true;
    element.show = true;
    this.updateProduct(element)
  }

  private updateProduct(element: ManageProductsResponse) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.alert.showSpinner();
    this.globalManageProductsService.getAllProducts().subscribe(res => {
      this.products = res;
      if (this.products.length > 1) this.products.reverse();
      this.dataSource.data = this.products;

      var contentContainer: HTMLDivElement = document.getElementById("contentContainer") as HTMLDivElement
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
    }, err => {
      this.alert.hideSpinner();
    })
  }
}
