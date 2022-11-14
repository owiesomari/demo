import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Alert } from 'src/app/utils/Alert';
import { AdminOrder } from 'src/app/Entities/admin/AdminOrder';
import { Utils } from 'src/app/utils/utils';
import { AdminOrderService } from 'src/app/services/admin/order/admin-order.service';
import { AdminActionRequest, Order } from 'src/app/Entities/admin/AdminOrderActionRequest';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: AdminOrder[] = [];
  tempOrders: AdminOrder[] = [];
  clonedOrders: AdminOrder[] = [];
  selectedOrderNumbers: string[] = [];
  adminActionRequest: AdminActionRequest = new AdminActionRequest();
  modalElement: HTMLElement | undefined
  modalComponent: Modal | undefined
  datemodalElement: HTMLElement | undefined
  datemodalComponent: Modal | undefined
  globalAdminOrderService: AdminOrderService

  alert = new Alert();
  modalOrderID = ""
  isFiltered = false;

  constructor(adminOrderService: AdminOrderService) {
    this.globalAdminOrderService = adminOrderService;
  }

  private filterTableByOrderNumber() {
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }

    (document.getElementById("all") as HTMLButtonElement).style.background = "#ce0000"
    var val = (document.getElementById("orderNumberInput") as HTMLInputElement).value

    this.tempOrders = this.orders.filter((obj) => {
      return obj.orderNumber.includes(val);
    });
    if (val == "") this.tempOrders = this.orders;
  }


  filterCategoty(event: any) {
    let id = event.target.id;
    this.setFilterButtonBackground(id);
    switch (id) {
      case "all": {
        if (this.isFiltered)
          this.tempOrders = this.clonedOrders;
        else
          this.tempOrders = this.orders;

      } break;

      case "pending": {
        this.filterData("PENDING");
      } break;

      case "tajheez": {

        this.filterData("SUSPENDED");

      } break;

      case "progress": {
        this.filterData("OTW");
      } break;

      case "completed": {
        this.filterData("COMPLETED");
      } break;

      case "cancled": {
        this.filterData("CANCELLED");
      } break;
    }
  }

  private filterData(filterText: string) {
    if (this.isFiltered) {
      this.tempOrders = this.clonedOrders.filter((obj) => {
        return obj.orderStatus == filterText
      });
    } else {
      this.tempOrders = this.orders.filter((obj) => {
        return obj.orderStatus == filterText
      });
    }
  }

  private setFilterButtonBackground(id: string) {
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }
    (document.getElementById(id) as HTMLButtonElement).style.background = "#ce0000"
  }

  openModal(event: any) {
    this.modalOrderID = event?.target.id
    this.fillModal(this.modalOrderID)
    this.modalElement = document.getElementById('modal') as HTMLElement;
    this.modalComponent = new Modal(this.modalElement);
    this.modalComponent.show();
  }


  closeModal() {
    this.modalComponent?.hide();
    window.location.reload();
  }

  cancelOrder() {
    var textArea = (document.getElementById("r_ca_modal") as HTMLTextAreaElement);
    if (textArea.value == '') {
      (document.getElementById("cancel_hint") as HTMLParagraphElement).style.display = "block";
      return;
    }
    this.alert.showSpinner();
    /*this.globalOrdersService.deleteOrder(this.modalOrderID, textArea.value).subscribe(res => {
      this.alert.hideSpinner();
      this.closeModal();
      this.alert.setupAlertDiv("s", "تمت بنجاح", "تم الالغاء بنجاح");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }, err => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })*/
  }

  private fillModal(id: string) {
    var a = this.orders.filter((obj) => {
      return obj.orderNumber.toString() == id;
    })[0];
    (document.getElementById("c_orderNumber") as HTMLSpanElement).innerText = a.orderNumber.toString();
  }

  filterDate(event: any) {
    this.showHideDates("none");
    this.isFiltered = true;
    switch (event.target.value) {
      case "none": {
        this.isFiltered = false;
        this.tempOrders = this.orders;
      } break;
      case "today": {
        this.filterByDays(1);
      } break;

      case "yestarday": {
        this.filterByDays(2);
      } break;

      case "lastweek": {
        var today = new Date();
        this.tempOrders = this.orders.filter((obj) => {
          var date = new Date(obj.orderDate);
          var difference = today.getTime() - date.getTime();
          var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
          if (TotalDays >= 1 && TotalDays < 8) return obj
          else return null
        });
      } break;

      case "lastmonth": {
        var today = new Date();
        this.tempOrders = this.orders.filter((obj) => {
          var date = new Date(obj.orderDate);
          var difference = today.getTime() - date.getTime();
          var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
          if (TotalDays >= 1 && TotalDays <= 31) return obj
          else return null
        });
      } break;
      case "custom": {
        var from = document.getElementById("fromDate") as HTMLInputElement;
        var to = document.getElementById("toDate") as HTMLInputElement;
        this.showHideDates("inline");
        from.value = ''
        to.value = ''
      } break;
    }
    this.clonedOrders = this.tempOrders;
  }

  showHideDates(state: string) {
    (document.getElementById("fromDateLabel") as HTMLLabelElement).style.display = state;
    (document.getElementById("fromDate") as HTMLInputElement).style.display = state;
    (document.getElementById("toDateLabel") as HTMLLabelElement).style.display = state;
    (document.getElementById("toDate") as HTMLInputElement).style.display = state;

  }

  filterByDays(days: number) {
    var today = new Date();
    this.tempOrders = this.orders.filter((obj) => {
      var date = new Date(obj.orderDate);
      var difference = today.getTime() - date.getTime();
      var TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
      if (TotalDays == days) return obj
      else return null
    });
  }

  filterRange() {
    var from = document.getElementById("fromDate") as HTMLInputElement;
    var to = document.getElementById("toDate") as HTMLInputElement;
    if (from.value != '' && to.value != '') {
      this.tempOrders = this.orders.filter((obj) => {
        var date = new Date(obj.orderDate);
        if (date >= new Date(from.value) && date <= new Date(to.value)) return obj;
        else return null
      });
    }
    this.clonedOrders = this.tempOrders;
  }

  getCellColor(status: string): string {
    switch (status) {

      case "PENDING": {
        return "#FC7383";
      }
      case "SUSPENDED": {
        return "#DAB7FB";
      }
      case "OTW": {
        return "#FFB959";
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
      case "SUSPENDED": {
        return "قيد التجهيز";
      }
      case "OTW": {
        return "قيد التسليم";
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

  getPaymentMethodValue(paymentMethod: string): string {
    switch (paymentMethod) {
      case "ONLINE": {
        return "الكتروني";
      }
      case "CASH": {
        return "عند الاستلام";
      }
      case "WALLET": {
        return "المحفظة المالية";
      }
    }
    return "";
  }

  showEmptyAction(status: string): Boolean {
    return status == 'CANCELLED' || status == 'COMPLETED';
  }

  disableFutureDate() {
    var nextDayDate = new Date(new Date().getTime()).toISOString().split('T')[0];
    (document.getElementById("fromDate") as HTMLInputElement).max = nextDayDate;
    (document.getElementById("toDate") as HTMLInputElement).max = nextDayDate;
  }

  selectAll() {
    var isSelectAllChecked = (document.getElementById("selectAll") as HTMLInputElement).checked
    this.selectedOrderNumbers = [];
    var inputs = document.getElementsByClassName("select-check");
    for (var i = 0; i < inputs.length; i++) {
      (inputs[i] as HTMLInputElement).checked = isSelectAllChecked;
      if (isSelectAllChecked) {
        this.selectedOrderNumbers.push((inputs[i] as HTMLInputElement).id.split(",")[1]);
        var td = (inputs[i] as HTMLInputElement).parentElement;
        var tr = td?.parentElement;
        (tr as HTMLTableRowElement).style.backgroundColor = "#F4F0F7";
      } else {
        var td = (inputs[i] as HTMLInputElement).parentElement;
        var tr = td?.parentElement;
        (tr as HTMLTableRowElement).style.backgroundColor = "";
      }
    }
    (document.getElementById("viewOrder") as HTMLButtonElement).disabled = (isSelectAllChecked || this.selectedOrderNumbers.length == 0);
    (document.getElementById("cancelOrders") as HTMLButtonElement).disabled = !(isSelectAllChecked);
    (document.getElementById("changeToTajheezBtn") as HTMLButtonElement).disabled = !(isSelectAllChecked);
    (document.getElementById("changeToOtwBtn") as HTMLButtonElement).disabled = !(isSelectAllChecked);
    (document.getElementById("changeToCompletedBtn") as HTMLButtonElement).disabled = !(isSelectAllChecked);
    (document.getElementById("print") as HTMLButtonElement).disabled = !(isSelectAllChecked);
  }

  selectRow(event: any) {
    var id = event.target.id;
    var isElementChecked = (document.getElementById(id) as HTMLInputElement).checked;
    var td = (document.getElementById(id) as HTMLInputElement).parentElement;
    var tr = td?.parentElement;
    //remove
    if (this.selectedOrderNumbers.indexOf(id.split(",")[1]) != -1)
      this.selectedOrderNumbers.splice(this.selectedOrderNumbers.indexOf(id.split(",")[1]), 1);
    if (isElementChecked) {
      this.selectedOrderNumbers.push(id.split(",")[1]);
      (tr as HTMLTableRowElement).style.backgroundColor = "#F4F0F7";
    }
    else {
      (document.getElementById("selectAll") as HTMLInputElement).checked = false;
      (tr as HTMLTableRowElement).style.backgroundColor = "";
    }

    (document.getElementById("viewOrder") as HTMLButtonElement).disabled = (this.selectedOrderNumbers.length > 1 || this.selectedOrderNumbers.length == 0);
    (document.getElementById("cancelOrders") as HTMLButtonElement).disabled = !(this.selectedOrderNumbers.length >= 1);
    (document.getElementById("changeToTajheezBtn") as HTMLButtonElement).disabled = !(this.selectedOrderNumbers.length >= 1);
    (document.getElementById("changeToOtwBtn") as HTMLButtonElement).disabled = !(this.selectedOrderNumbers.length >= 1);
    (document.getElementById("changeToCompletedBtn") as HTMLButtonElement).disabled = !(this.selectedOrderNumbers.length >= 1);
    (document.getElementById("print") as HTMLButtonElement).disabled = !(this.selectedOrderNumbers.length >= 1);
  }

  toolbarBtnClick(event: any) {
    this.adminActionRequest.actionResponse = [];
    switch (event.target.id) {
      case "viewOrder": {

      } break;

      case "cancelOrders": {
        this.fillActionRequest("CANCELLED")
      } break;

      case "changeToTajheezBtn": {
        this.fillActionRequest("SUSPENDED")
      } break;

      case "changeToOtwBtn": {
        this.fillActionRequest("OTW")
      } break;

      case "changeToCompletedBtn": {
        this.fillActionRequest("COMPLETED")
      } break;

      case "print": {

      } break;

      case "export": {
        Utils.exportAsExcelFile(this.orders, 'orders');
      } break;
    }
  }

  private fillActionRequest(status: string) {
    for (var i = 0; i < this.selectedOrderNumbers.length; i++) {
      var request = new Order();
      request.orderNumber = this.selectedOrderNumbers[i];
      request.orderStatus = status;
      this.adminActionRequest.actionResponse.push(request);
    }
  }

  private filterTableByOrderDate(){
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }

    (document.getElementById("all") as HTMLButtonElement).style.background = "#ce0000"
    var val = (document.getElementById("orderDateInput") as HTMLInputElement).value

    this.tempOrders = this.orders.filter((obj) => {
      return obj.orderDate== new Date(val);
    });
    if (val == "") this.tempOrders = this.orders;
  }

  private filterTableByMarketerName(){
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }

    (document.getElementById("all") as HTMLButtonElement).style.background = "#ce0000"
    var val = (document.getElementById("marketerNameInput") as HTMLInputElement).value

    this.tempOrders = this.orders.filter((obj) => {
      return obj.marketerName.includes(val);
    });
    if (val == "") this.tempOrders = this.orders;
  }

  private filterTableByPaymentMethod(){
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }

    (document.getElementById("all") as HTMLButtonElement).style.background = "#ce0000"
    var val = (document.getElementById("paymentMethodInput") as HTMLInputElement).value

    this.tempOrders = this.orders.filter((obj) => {
      return obj.paymentMethod.includes(val);
    });
    if (val == "") this.tempOrders = this.orders;
  }

  private filterTableByTotal(){
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }

    (document.getElementById("all") as HTMLButtonElement).style.background = "#ce0000"
    var val = (document.getElementById("totalInput") as HTMLInputElement).value

    this.tempOrders = this.orders.filter((obj) => {
      return obj.totalPrice==Number(val);
    });
    if (val == "") this.tempOrders = this.orders;
  }

  inputsFiltersTable(event: any) {
    switch (event.target.id) {
      case "orderNumberInput": {
        this.filterTableByOrderNumber();

      } break;

      case "orderDateInput": {
        this.filterTableByOrderDate();

      } break;

      case "marketerNameInput": {
        this.filterTableByMarketerName();
      } break;

      case "paymentMethodInput": {
        this.filterTableByPaymentMethod();

      } break;

      case "totalInput": {
        this.filterTableByTotal();

      } break;

      case "phoneNumberInput": {

      } break;

      case "linkInput": {

      } break;
      case "completedDateInput": {

      } break;
      case "statusInput": {

      } break;
    }

  }

  ngOnInit(): void {
    let order: AdminOrder = new AdminOrder();
    order.completedDate = new Date('1/10/2022');
    order.customerPhoneNumber = "0797048997";
    order.marketerName = "اويس العمري";
    order.orderDate = new Date("9/10/2022");
    order.orderNumber = "1234";
    order.orderStatus = "PENDING";
    order.paymentMethod = "WALLET";
    order.totalPrice = 20;

    let order2: AdminOrder = new AdminOrder();
    order2.completedDate = new Date('1/10/2022');
    order2.customerPhoneNumber = "0797048997";
    order2.marketerName = "عبد الله العمري";
    order2.orderDate = new Date("9/10/2022");
    order2.orderNumber = "12345";
    order2.orderStatus = "SUSPENDED";
    order2.paymentMethod = "WALLET";
    order2.totalPrice = 20;

    let order3: AdminOrder = new AdminOrder();
    order3.completedDate = new Date('1/10/2022');
    order3.customerPhoneNumber = "0797048997";
    order3.marketerName = "خالد الشبول";
    order3.orderDate = new Date("9/10/2022");
    order3.orderNumber = "12346";
    order3.orderStatus = "OTW";
    order3.paymentMethod = "WALLET";
    order3.totalPrice = 20;

    let order4: AdminOrder = new AdminOrder();
    order4.completedDate = new Date('1/10/2022');
    order4.customerPhoneNumber = "0797048997";
    order4.marketerName = "عمران";
    order4.orderDate = new Date("9/10/2022");
    order4.orderNumber = "12347";
    order4.orderStatus = "CANCELLED";
    order4.paymentMethod = "WALLET";
    order4.totalPrice = 20;

    this.orders.push(order);
    this.orders.push(order2);
    this.orders.push(order3);
    this.orders.push(order4);
    this.tempOrders = this.orders;
    this.clonedOrders = this.orders;
  }
}
