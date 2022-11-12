import { Component, OnInit } from '@angular/core';
import { CartDetails } from 'src/app/Entities/Cart';
import { Router } from '@angular/router';
import { Validator } from 'src/app/utils/Valitator';
import { Modal } from 'bootstrap';
import { CartService } from 'src/app/services/cart/cart.service';
import { Alert } from 'src/app/utils/Alert';

import { CustomerShipmentDetails, OrdersRequest, ProductInfo } from 'src/app/Entities/OrdersRequest';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartData: CartDetails[] = [];
  private errorMsgs: string[] = [];
  private customerName: HTMLInputElement | undefined
  private address: HTMLInputElement | undefined
  private modalElement: HTMLElement | undefined
  private modalComponent: Modal | undefined
  private globalCartServicd: CartService
  private alert = new Alert();
  private validator: Validator | undefined
  atLeastOneInacive = false
  orderPreparationCost = 0;
  orderShippingCost = 0;
  shippingPeriod = "";

  constructor(private router: Router, cartService: CartService) {
    this.validator = new Validator();
    this.globalCartServicd = cartService;
  }

  remove(event: any) {
    var id = event.target.id;
    this.alert.showSpinner();
    var indexToBeDeleted = this.cartData.findIndex(d => d.sku == id);
    this.cartData.splice(indexToBeDeleted, 1);
    this.globalCartServicd.removeFromCart(id).subscribe(() => {
      this.alert.hideSpinner();
    }, () => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
    if (this.cartData.length == 0) this.router.navigateByUrl('/catalog')
    else window.location.reload();
  }

  calculations(event: any) {
    var sku = event.target.id.split(',')[1];

    var quntities: HTMLCollection = document.getElementsByClassName("qantity");
    var sells: HTMLCollection = document.getElementsByClassName("sell");
    var sellingPrice: HTMLInputElement = (document.getElementById("sellingPrice," + sku)) as HTMLInputElement
    var quantity: HTMLInputElement = (document.getElementById("qantity," + sku)) as HTMLInputElement
    var total: HTMLParagraphElement = (document.getElementById("totalValue," + sku)) as HTMLParagraphElement

    if (sellingPrice.value == '' || sellingPrice.value == null) {
      total.innerText = "0.000"
    }

    else if (quantity.value == '' || quantity.value == null) {
      total.innerText = "0.000"
    }

    else {
      var t = Math.round(Number(sellingPrice.value) * Number(quantity.value) * 100) / 100
      total.innerText = t.toString();
      var totalCost = 0;

      for (var i = 0; i < quntities.length; i++) {
        if (this.cartData[i].active)
          totalCost += Number((quntities[i] as HTMLInputElement).value) * this.cartData[i].costPrice;
      }

      ((document.getElementById("totalCost")) as HTMLSpanElement).innerText = Math.round(Number(totalCost) * 100) / 100
        + " د.أ";


      ((document.getElementById("totalCostPlusShiping")) as HTMLSpanElement).innerText = Math.round(Number(totalCost + this.orderShippingCost) * 100) / 100
        + " د.أ"


      //calculate for from customer money 
      var fromCustomer: number = 0;
      for (var i = 0; i < quntities.length; i++) {
        if (!quntities[i].hasAttribute("disabled"))
          fromCustomer += Number((quntities[i] as HTMLInputElement).value) * Number((sells[i] as HTMLInputElement).value);
      }

      ((document.getElementById("fromCustomer")) as HTMLSpanElement).innerText = Math.round(Number(fromCustomer + this.orderShippingCost) * 100) / 100 + "د.أ";

      this.calculateProfit();
    }
  }

  calculateProfit() {
    var quntities: HTMLCollection = document.getElementsByClassName("qantity");
    var sells: HTMLCollection = document.getElementsByClassName("sell");
    var totalCost = 0;
    var totalSell = 0;
    for (var i = 0; i < quntities.length; i++) {
      if (!quntities[i].hasAttribute("disabled")) {
        totalSell += Number((quntities[i] as HTMLInputElement).value) * Number((sells[i] as HTMLInputElement).value)
        totalCost += this.cartData[i].costPrice * Number((quntities[i] as HTMLInputElement).value);
      }
    }
    ((document.getElementById("your_profit")) as HTMLSpanElement).innerText = Math.round(Number(totalSell - totalCost - this.orderPreparationCost) * 100) / 100 + " د.أ";
  }

  createOrder() {
    if (!this.validations())
      return;
    this.alert.showSpinner();

    var ordersRequest = new OrdersRequest();
    var productInfos: ProductInfo[] = [];
    var quntities: HTMLCollection = document.getElementsByClassName("qantity");
    var sells: HTMLCollection = document.getElementsByClassName("sell");
    var skus: HTMLCollection = document.getElementsByClassName("sku");
    var totals: HTMLCollection = document.getElementsByClassName("total");
    for (var i = 0; i < sells.length; i++) {
      if (!sells[i].hasAttribute("disabled")) {
        var productInfo = new ProductInfo();
        productInfo.sku = skus[i].innerHTML.toString();
        productInfo.quantity = Number((quntities[i] as HTMLInputElement).value);
        productInfo.sellingPrice = Number((sells[i] as HTMLInputElement).value);
        productInfo.totalPrice = Number(totals[i].innerHTML);
        productInfos.push(productInfo)
      }
    }

    var customerShipmentDetails = new CustomerShipmentDetails();

    customerShipmentDetails.customerName = (document.getElementById("customer_name") as HTMLInputElement).value;
    customerShipmentDetails.country = "Jordan";
    customerShipmentDetails.city = (document.getElementById("city") as HTMLSelectElement).value;
    customerShipmentDetails.phoneNumber = (document.getElementById("phone_number") as HTMLInputElement).value;
    customerShipmentDetails.storeName = (document.getElementById("store_name") as HTMLInputElement).value;
    customerShipmentDetails.address = (document.getElementById("address") as HTMLTextAreaElement).value;
    customerShipmentDetails.notes = (document.getElementById("notes") as HTMLTextAreaElement).value;

    var methods = document.getElementsByName('methods');
    var selectedMethod = "";
    for (var i = 0; i < methods.length; i++) {
      if ((methods[i] as HTMLInputElement).checked) {
        selectedMethod = (methods[i] as HTMLInputElement).value;
      }
    }

    ordersRequest.customerShipmentDetails = customerShipmentDetails;
    ordersRequest.productsInfo = productInfos;
    ordersRequest.paymentMethod = selectedMethod?.toString();
    this.globalCartServicd.createOrder(ordersRequest).subscribe(res => {
      this.alert.hideSpinner();
      this.router.navigateByUrl('/orderConfirmation')
    }, err => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }

  validations(): Boolean {
    this.errorMsgs = []
    if (this.validator?.isElementEmpty(this.customerName)) {
      this.errorMsgs.push("حقل اسم العميل مطلوب")
    }

    if ((document.getElementById("phone_number") as HTMLInputElement).value == '') {
      this.errorMsgs.push("حقل رقم الهاتف مطلوب")
    }

    if (this.validator?.isElementEmpty(this.address)) {
      this.errorMsgs.push("حقل العنوان مطلوب")
    }

    this.validateSellingPrice();
    // this.validatePhoneNumber();

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
      if (this.cartData[i].active)
        if (Number((sells[i] as HTMLInputElement).value) < this.cartData[i].costPrice) {
          this.errorMsgs.push("يرجى التاكد من ان الاسعار اكبر من سعر التكلفة")
          return;
        }
    }
  }

  /* validatePhoneNumber() {
     var phone = document.getElementById("phone_number") as HTMLInputElement;
     if (!phone.value.startsWith("079") && !phone.value.startsWith("078") && !phone.value.startsWith("077") && !phone.value.startsWith("٠٧٩") && !phone.value.startsWith("٠٧٨") && !phone.value.startsWith("٠٧٧"))
       this.errorMsgs.push("رقم الهاتف يجب ان يبدأ ب 079 , 078 او 077")
 
     if (phone.value.length < 10)
       this.errorMsgs.push("يجب ان يتكون رقم الهاتف من 10 خانات")
 
   }*/

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

  private setDeafultCalculations() {
    var total: HTMLSpanElement = (document.getElementById("totalCost")) as HTMLSpanElement
    var totalCost = 0;
    for (var i = 0; i < this.cartData.length; i++) {
      if (this.cartData[i].active)
        totalCost += this.cartData[i].costPrice * this.cartData[i].quantity;
    }

    total.innerText = totalCost.toString() + " د.أ";

    ((document.getElementById("totalCostPlusShiping")) as HTMLSpanElement).innerText = totalCost + this.orderShippingCost + " د.أ";

    //from customer
    var fromCustomer_ = 0
    for (var i = 0; i < this.cartData.length; i++) {
      if (this.cartData[i].active)
        fromCustomer_ += this.cartData[i].suggestedPrice * this.cartData[i].quantity;
    }
    ((document.getElementById("fromCustomer")) as HTMLSpanElement).innerText = fromCustomer_ + this.orderShippingCost + "د.أ";

    //profit
    ((document.getElementById("your_profit")) as HTMLSpanElement).innerText = fromCustomer_ - totalCost - this.orderPreparationCost + " د.أ";
  }

  getRowColor(sku: string): string {
    if (!this.cartData.filter((obj) => {
      return obj.sku == sku
    })[0].active) {
      return "#f8d7da"
    } else {
      return '';
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.customerName = document.getElementById("customer_name") as HTMLInputElement;
    this.address = document.getElementById("address") as HTMLInputElement;
    this.alert.showSpinner();

    this.globalCartServicd.getCartData().subscribe(res => {
      this.cartData = res.cartItemsResponse;
      this.orderPreparationCost = res.orderPreparationCost;
      this.orderShippingCost = res.orderShippingCost;
      this.shippingPeriod = res.shippingPeriod;

      if (this.cartData.filter((obj) => {
        return obj.active
      }).length == 0) {
        (document.getElementById("createOrderBtn") as HTMLButtonElement).disabled = true
      }
      this.atLeastOneInacive = this.cartData.filter((obj) => {
        return !obj.active
      }).length != 0;
      if (this.cartData.length == 0) this.router.navigateByUrl('/catalog')
      var contentContainer: HTMLDivElement = document.getElementById("container") as HTMLDivElement;
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
      this.setDeafultCalculations();
    }, () => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }
}