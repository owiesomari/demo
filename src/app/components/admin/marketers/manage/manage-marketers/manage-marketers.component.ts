import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdminMarketersExcelModel } from 'src/app/Entities/admin/AdminMarketersExcelModel';
import { AllUser } from 'src/app/Entities/admin/UsersResponse';
import { MarketersServiceService } from 'src/app/services/admin/marketer/marketers-service.service';
import { Alert } from 'src/app/utils/Alert';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-manage-marketers',
  templateUrl: './manage-marketers.component.html',
  styleUrls: ['./manage-marketers.component.css']
})
export class ManageMarketersComponent implements OnInit, AfterViewInit {
  private users: AllUser[] = [];
  private filteredUsers: AllUser[] = [];

  private selectedUsers: string[] = [];
  private globalMarketerService: MarketersServiceService;
  private alert = new Alert();

  dataSource = new MatTableDataSource<AllUser>(this.users);
  displayedColumns: string[] = ['select', 'الاسم', 'البريد الاكتروني', 'رقم الهاتف', 'الطلبات المسلمة', 'تاريخ الانضمام', 'الاجراءات'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<AllUser>(true, []);


  constructor(marketerService: MarketersServiceService) {
    this.globalMarketerService = marketerService;
    var x :AllUser = new AllUser();
    x.userName = "owies";
    x.email="owies@gmail.com";
    x.phoneNumber = "0797048997"

    var x2 :AllUser = new AllUser();
    x2.userName = "haneen";
    x2.email="owies@gmail.com";
    x2.phoneNumber = "0797048997"

    var x3 :AllUser = new AllUser();
    x3.userName = "abdullah";
    x3.email="owies@gmail.com";
    x3.phoneNumber = "0797048997"

    this.users.push(x)
    this.users.push(x2)
    this.users.push(x3)
    this.filteredUsers = this.users;

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    (document.getElementsByClassName("mat-paginator-page-size-label"))[0].innerHTML = "عدد المنتجات بالصفحة "
  }

  filterTable(event: any) {
    let filterText = (document.getElementById(event.target.id) as HTMLInputElement).value;
    this.filteredUsers = this.users.filter((obj) => {
      return obj.userName.includes(filterText);
    });

    if (filterText == "") {
      this.filteredUsers = this.users;
    }
    this.dataSource.data = this.filteredUsers;
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

  exportToExcel() {
    Utils.exportAsExcelFile(this.fillExcelArray(this.filteredUsers), 'Marketers');
  }

  private fillExcelArray(users: AllUser[]): AdminMarketersExcelModel[] {
    debugger
    var excelmodel: AdminMarketersExcelModel[] = [];
    if(this.selectedUsers.length==0){
    users.forEach((user) => {
      excelmodel.push(new AdminMarketersExcelModel(user.userName, user.email, user.phoneNumber))
    });
  }
  else{
    users.forEach((user) => {
      this.selectedUsers.forEach((selectedUser)=>{
        if(selectedUser == user.userName){
          excelmodel.push(new AdminMarketersExcelModel(user.userName, user.email, user.phoneNumber))
        }
      })
    });
  }
    return excelmodel;
  }

  ngOnInit(): void {
    scrollTo(0, 0);
    //  this.alert.showSpinner();
    /* this.globalMarketerService.getUsers().subscribe(res =>{
       this.users = res.allUsers;
       this.filteredUsers = this.users;
     },err=>{
 
     })*/
  }
}