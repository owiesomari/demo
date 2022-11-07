import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Entities/Order';
import { Modal } from 'bootstrap';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { Alert } from 'src/app/utils/Alert';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  tempOrders: Order[] = [];

  modalElement: HTMLElement | undefined
  modalComponent: Modal | undefined
  datemodalElement: HTMLElement | undefined
  datemodalComponent: Modal | undefined
  globalOrdersService: OrdersService
  alert = new Alert();
  modalOrderID = ""

  constructor(ordersService: OrdersService) {
    this.globalOrdersService = ordersService
  }

  filterTable(event: any) {
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }

    (document.getElementById("all") as HTMLButtonElement).style.background = "#ce0000"

    this.tempOrders = this.orders.filter((obj) => {
      return obj.customerName.includes(event.target.value);
    });
    if (event.target.value == "") this.tempOrders = this.orders;
  }


  filterCategoty(event: any) {
    let id = event.target.id;
    this.setFilterButtonBackground(id);
    switch (id) {
      case "all": {
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
    this.tempOrders = this.orders.filter((obj) => {
      return obj.orderStatus == filterText
    });
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
    if(textArea.value == ''){
      (document.getElementById("cancel_hint") as HTMLParagraphElement).style.display = "block";
      return;
    }
    this.alert.showSpinner();
    this.globalOrdersService.deleteOrder(this.modalOrderID, textArea.value).subscribe(res => {
      this.alert.hideSpinner();
      this.closeModal();
      this.alert.setupAlertDiv("s", "تمت بنجاح", "تم الالغاء بنجاح");
      setTimeout(function(){
        window.location.reload();
      },1000);
    }, err => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }

  private fillModal(id: string) {
    var a = this.orders.filter((obj) => {
      return obj.orderNumber.toString() == id;
    })[0];
    (document.getElementById("c_orderNumber") as HTMLSpanElement).innerText = a.orderNumber.toString();
  }


  filterDate(event: any) {
    console.log(event.target.value)
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

  getStatusCellValue(status: string):string{
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

  getPaymentMethodValue(paymentMethod:string):string{
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

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.alert.showSpinner();
    this.globalOrdersService.getOrders().subscribe(res => {
      this.orders = res;
      this.tempOrders = res;
      var contentContainer: HTMLDivElement = document.getElementById("content") as HTMLDivElement
      this.alert.hideSpinner();
      contentContainer.style.display = "block";

    }, err => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }
}