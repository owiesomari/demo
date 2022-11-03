import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Entities/Order';
import { Modal } from 'bootstrap';

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

  modalOrderID = ""

  constructor() {
    this.orders = [
      new Order(1, "12/10/2022", "owies", 12, "", "عند الاستلام", 12, "قيد التسليم", "#FFB959"),
      new Order(2, "12/10/2022", "ahmed", 12, "https://www.google.com/", "عند الاستلام", 12, "مكتملة", "#67CFA2"),
      new Order(3, "12/10/2022", "abdullah", 12, "https://www.google.com/", "عند الاستلام", 12, "ملغية", "#CE0000"),
      new Order(5, "12/10/2022", "noor", 12, "https://www.google.com/", "عند الاستلام", 12, "معلقة", "#FC7383"),
      new Order(6, "12/10/2022", "ali", 12, "https://www.google.com/", "عند الاستلام", 12, "معلقة", "#FC7383"),
    ];

    this.tempOrders = this.orders;
  }

  filterTable(event: any) {
    let buttonsParent = (document.getElementById("buttons") as HTMLDivElement).childNodes
    for (var i = 0; i < buttonsParent.length; i++) {
      (buttonsParent[i].childNodes[0] as HTMLButtonElement).style.background = "#fff"
    }

    (document.getElementById("all") as HTMLButtonElement).style.background = "#ce0000"

    this.tempOrders = this.orders.filter((obj) => {
      return obj.getCustomerName().includes(event.target.value);
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
        this.filterData("معلقة");
      } break;

      case "tajheez": {

        this.filterData("tajheez");//edit

      } break;

      case "progress": {
        this.filterData("قيد التسليم");
      } break;

      case "completed": {
        this.filterData("مكتملة");
      } break;

      case "cancled": {
        this.filterData("ملغية");
      } break;
    }

  }

  private filterData(filterText: string) {
    this.tempOrders = this.orders.filter((obj) => {
      return obj.getStatus() == filterText
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

  }

  cancelOrder() {
    console.log(this.modalOrderID);
    //call api with modalOrderID

  }

  private fillModal(id: string) {
    var a = this.orders.filter((obj) => {
      return obj.getID().toString() == id;
    })[0];
    (document.getElementById("c_orderNumber") as HTMLSpanElement).innerText = a.getID().toString();
  }

  openDateModal() {
    this.datemodalElement = document.getElementById('picker') as HTMLElement;
    this.datemodalComponent = new Modal(this.datemodalElement);
    this.datemodalComponent.show();
  }

  filterDate(event: any) {
    console.log(event.target.value)
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    //this.openDateModal();
  }
}