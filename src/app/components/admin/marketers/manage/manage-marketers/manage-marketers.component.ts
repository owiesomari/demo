import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AllUser, UsersResponse } from 'src/app/Entities/admin/UsersResponse';
import { MarketersServiceService } from 'src/app/services/admin/marketer/marketers-service.service';
import { Alert } from 'src/app/utils/Alert';

@Component({
  selector: 'app-manage-marketers',
  templateUrl: './manage-marketers.component.html',
  styleUrls: ['./manage-marketers.component.css']
})
export class ManageMarketersComponent implements OnInit, AfterViewInit {
  private users: AllUser[] = [];
  private selectedUsers :string[]=[];
  private globalMarketerService : MarketersServiceService;
  private alert = new Alert();

  dataSource = new MatTableDataSource<AllUser>(this.users);
  displayedColumns: string[] = ['select', 'الاسم', 'البريد الاكتروني', 'رقم الهاتف', 'الطلبات المسلمة', 'تاريخ الانضمام', 'الاجراءات'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<AllUser>(true, []);


  constructor(marketerService:MarketersServiceService) {
    this.globalMarketerService = marketerService;
   }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    (document.getElementsByClassName("mat-paginator-page-size-label"))[0].innerHTML = "عدد المنتجات بالصفحة "
  }

  filterTable(event: any) {
    let filterText = (document.getElementById(event.target.id) as HTMLInputElement).value;
    console.log(filterText)
    this.dataSource.data = this.users.filter((obj) => {
      return obj.firstName.includes(filterText);
    });

    if (filterText == "") {
      this.dataSource.data = this.users;
    }
  }

  isAllSelected() {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  selectAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedUsers = [];
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
      this.selectedUsers = this.selection.selected.map((obj) => { return obj.userName });
    }
  }

    selectRow(user: AllUser) {
      this.selection.toggle(user);
      this.selectedUsers = this.selection.selected.map((obj) => { return obj.userName });
  }

  ngOnInit(): void {
    scrollTo(0,0);
    this.alert.showSpinner();
    this.globalMarketerService.getUsers().subscribe(res =>{
      this.users = res.allUsers
    },err=>{

    })
  }
}