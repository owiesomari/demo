import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Entities/Cart';
import { Router } from '@angular/router';
import { Validator } from 'src/app/utils/Valitator';
import { Modal } from 'bootstrap';
import { CartService } from 'src/app/services/cart/cart.service';
import { Alert } from 'src/app/utils/Alert';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: Cart[] = [];
  private errorMsgs: string[] = [];
  private customerName: HTMLInputElement | undefined
  private phoneNumber: HTMLInputElement | undefined
  private address: HTMLInputElement | undefined
  modalElement: HTMLElement | undefined
  modalComponent: Modal | undefined
  globalCartServicd: CartService
  alert = new Alert();

  private validator: Validator | undefined

  constructor(private router: Router, cartService:CartService) {
    this.validator = new Validator();
    this.globalCartServicd = cartService;
  }

  remove(event: any) {
    var id = event.target.id;
    //call api  to delete 
    var indexToBeDeleted = this.cartData.findIndex(d => d.sku == id);
    this.cartData.splice(indexToBeDeleted, 1);
    console.log(this.cartData)
    if (this.cartData.length == 0) this.router.navigateByUrl('/catalog')
    else window.location.reload();
  }

  calculations(event: any) {
    var quntities: HTMLCollection = document.getElementsByClassName("qantity");
    var sells: HTMLCollection = document.getElementsByClassName("sell");
    var id = event.target.id.split(',')[1];
    var sellingPrice: HTMLInputElement = (document.getElementById("sellingPrice," + id)) as HTMLInputElement
    var quantity: HTMLInputElement = (document.getElementById("qantity," + id)) as HTMLInputElement
    var total: HTMLParagraphElement = (document.getElementById("totalValue," + id)) as HTMLParagraphElement

    if (sellingPrice.value == '' || sellingPrice.value == null) {
      total.innerText = "0.000 د.أ"
    }

    else if (quantity.value == '' || quantity.value == null) {
      total.innerText = "0.000 د.أ"
    }

    else {
      var t = Math.round(Number(sellingPrice.value) * Number(quantity.value) * 100) / 100
      total.innerText = t + " د.أ"
      var totalCost = 0;
      for (var i = 0; i < quntities.length; i++) {
        totalCost += Number((quntities[i] as HTMLInputElement).value) * this.cartData[i].costPrice;
      }

      ((document.getElementById("totalCost")) as HTMLSpanElement).innerText = Math.round(Number(totalCost) * 100) / 100
        + " د.أ"

      //calculate for from customer money 
      var fromCustomer: number = 0;
      for (var i = 0; i < quntities.length; i++) {
        fromCustomer += Number((quntities[i] as HTMLInputElement).value) * Number((sells[i] as HTMLInputElement).value);
      }

      ((document.getElementById("fromCustomer")) as HTMLSpanElement).innerText = Math.round(Number(fromCustomer + 2.75) * 100) / 100 + "د.أ";

      this.calculateProfit();
    }
  }

  calculateProfit() {
    var quntities: HTMLCollection = document.getElementsByClassName("qantity");
    var sells: HTMLCollection = document.getElementsByClassName("sell");
    var totalCost = 0;
    var totalSell = 0;
    for (var i = 0; i < quntities.length; i++) {
      totalSell += Number((quntities[i] as HTMLInputElement).value) * Number((sells[i] as HTMLInputElement).value)
      totalCost += this.cartData[i].costPrice;
    }
    ((document.getElementById("your_profit")) as HTMLSpanElement).innerText = Math.round(Number(totalSell - totalCost - 1) * 100) / 100 + " د.أ";
  }

  createOrder() {
    if(!this.validations())
    return;
    
    //else call api 

  }

  validations(): Boolean {
    this.errorMsgs = []
    if (this.validator?.isElementEmpty(this.customerName)) {
      this.errorMsgs.push("حقل اسم العميل مطلوب")
    }

    if (this.validator?.isElementEmpty(this.phoneNumber)) {
      this.errorMsgs.push("حقل رقم الهاتف مطلوب")
    }

    if (this.validator?.isElementEmpty(this.address)) {
      this.errorMsgs.push("حقل العنوان مطلوب")
    }

    this.validateSellingPrice();

    if (this.errorMsgs.length == 0) {
      return true
    } else {
      this.openErrorModal();
      return false;
    }
  }

  validateSellingPrice() {
    var sells: HTMLCollection = document.getElementsByClassName("sell");
    for (var i = 0; i < this.cartData.length; i++) {
      if (Number((sells[i] as HTMLInputElement).value) < this.cartData[i].costPrice) {
        this.errorMsgs.push("يرجى التاكد من ان الاسعار اكبر من سعر التكلفة")
        return;
      }
    }
  }

  openErrorModal() {
    var msg = ""
    for (var i = 0; i < this.errorMsgs.length; i++) {
      msg += "* " + this.errorMsgs[i] + "\n";
    }
    (document.getElementById("body") as HTMLHeadingElement).innerText = msg;
    this.modalElement = document.getElementById('error_modal') as HTMLElement;
    this.modalComponent = new Modal(this.modalElement);
    this.modalComponent.show();
  }

  hidErrorModal() {
    this.modalComponent?.hide();
  }

  private setDeafultCalculations(){
    var total: HTMLSpanElement = (document.getElementById("totalCost")) as HTMLSpanElement
    var totalCost = 0;
    for (var i = 0; i < this.cartData.length; i++) {
      totalCost += this.cartData[i].costPrice;
    }

    total.innerText = totalCost.toString() + " د.أ";
    ((document.getElementById("totalCostPlusShiping")) as HTMLSpanElement).innerText = totalCost + 2.75 + " د.أ";


    //from customer
    var fromCustomer_ = 0
    for (var i = 0; i < this.cartData.length; i++) {
      fromCustomer_ += this.cartData[i].suggestedPrice;
    }
    ((document.getElementById("fromCustomer")) as HTMLSpanElement).innerText = fromCustomer_ + 2.75 + "د.أ";


    //profit
    ((document.getElementById("your_profit")) as HTMLSpanElement).innerText = fromCustomer_ - totalCost - 1 + " د.أ";
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.customerName = document.getElementById("customer_name") as HTMLInputElement;
    this.phoneNumber = document.getElementById("phone") as HTMLInputElement;
    this.address = document.getElementById("address") as HTMLInputElement;
    this.alert.showSpinner();

    this.globalCartServicd.getCartData().subscribe(res => {
      console.log(res);
      this.cartData = res;
      var contentContainer: HTMLDivElement = document.getElementById("container") as HTMLDivElement;
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
      this.setDeafultCalculations();
    }, err => {
      console.log(err)
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    }) 
  }
}
