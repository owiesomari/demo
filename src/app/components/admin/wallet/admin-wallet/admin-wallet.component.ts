import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-wallet',
  templateUrl: './admin-wallet.component.html',
  styleUrls: ['./admin-wallet.component.css']
})
export class AdminWalletComponent implements OnInit {

  constructor() { }

  dataSource = new MatTableDataSource<any>(["1", "12/12/12", "owies", "20 jod", "online", "pending"]);//change

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['ID', 'تاريخ الطلب', 'العميل', 'المبلغ', 'طريقة التحويل', 'الحالة', 'الاجراءات'];


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  getCellColor(status: string): string {
    switch (status) {

      case "PENDING": {
        return "#FC7383";
      }
      case "COMPLETED": {
        return "#67CFA2";
      }
      case "CANCELLED": {
        return "#CE0000";
      }
    }
    return "";
  }

  getStatusCellValue(status: string): string {
    switch (status) {
      case "PENDING": {
        return "معلقة";
      }
      case "COMPLETED": {
        return "مكتملة";
      }
      case "CANCELLED": {
        return "ملغية";
      }
    }
    return "";
  }

  filterTable(type: string) {
    switch (type) {
      case "COMPLETED": {

      } break;

      case "PENDDING": {

      } break;

      case "CANCELED": {

      } break;
    }
  }

  ngOnInit(): void {
  }
}
