import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { OrderDetails } from 'src/app/Entities/OrderDetails';
import { OrderdetailsService } from 'src/app/services/orderdetails/orderdetails.service';
import { Alert } from 'src/app/utils/Alert';

@Component({
  selector: 'app-ordredetails',
  templateUrl: './ordredetails.component.html',
  styleUrls: ['./ordredetails.component.css']
})
export class OrdredetailsComponent implements OnInit {

  orderNumber: string | undefined = "0"
  orderDeails: OrderDetails = new OrderDetails()
  textAreadDisabled: Boolean = false
  globalorderDeatialsService: OrderdetailsService
  alert = new Alert();


  constructor(private _Activatedroute: ActivatedRoute, orderDeatialsService: OrderdetailsService) {
    this.orderNumber = this._Activatedroute.snapshot.paramMap.get("order_number")?.toString()
    this.globalorderDeatialsService = orderDeatialsService
  }

  print() {
    var mywindow = window.open('Dropphi', 'Dropphi', 'height=400,width=600');

    var content = '<!DOCTYPE html><html>    <head>        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"><style>    body {    direction: rtl;    text-align: right;    font-family:"Cairo", Arial, Helvetica, sans-serif;}    #invoice {  padding: 30px;  page-break-after: always;}.invoice {  position: relative;  background-color: #FFF;  min-height: 680px;  padding: 15px}.invoice header {  padding: 10px 0;  margin-bottom: 20px;  border-bottom: 1px solid #3989c6}.invoice .company-details {  text-align: left}.invoice .company-details .name {  margin-top: 0;  margin-bottom: 0}.invoice .contacts {  margin-bottom: 20px}.invoice .invoice-to {  text-align: left}.invoice .invoice-to .to {  margin-top: 2px;  margin-bottom: 10px;}.invoice .invoice-details {  text-align: right}.font-bold {  font-weight: bold;}.invoice .invoice-details .invoice-id {  margin-top: 0;  color: #3989c6}.invoice main {  padding-bottom: 50px}.invoice main .thanks {  font-size: 2em;  margin-bottom: 50px}.invoice main .notices {  padding-right: 6px;  border-right: 6px solid #3989c6}.invoice main .notices .notice {  font-size: 1.2em}.invoice table {  width: 100%;  border-collapse: collapse;  border-spacing: 0;  margin-bottom: 20px}.invoice table td,.invoice table th {  padding: 15px;  background: #eee;  border-bottom: 1px solid #fff}.invoice table th {  white-space: nowrap;  font-size: 16px}.invoice table td h3 {  margin: 0;  font-weight: 400;  color: #3989c6;  font-size: 1.2em}.invoice table .qty,.invoice table .total,.invoice table .unit {  text-align: left;  font-size: 1.2em}.invoice table .no {  color: #fff;  font-size: 1.6em;  background: #3989c6}.invoice table .unit {  background: #ddd}.invoice table .total {  background: #3989c6;  color: #fff}.invoice table tbody tr:last-child td {  border: none}.invoice table tfoot td {  background: 0 0;  border-bottom: none;  white-space: nowrap;  text-align: left;  padding: 10px 20px;  font-size: 1.2em;  border-top: 1px solid #aaa}.invoice table tfoot tr:first-child td {  border-top: none}.invoice table tfoot tr:last-child td {  color: #3989c6;  font-size: 1.4em;  border-top: 1px solid #3989c6}.invoice table tfoot tr td:first-child {  border: none}.invoice footer {  width: 100%;  text-align: center;  color: #777;  border-top: 1px solid #aaa;  padding: 8px 0}@media print {  .invoice {      font-size: 11px!important;      overflow: hidden!important  }  .invoice footer {      position: absolute;      bottom: 10px;      page-break-after: always  }}.phone {  unicode-bidi: embed;  direction: ltr;}.logo {  max-width: 200px;}</style>    </head>    <body>        <div id="invoice">            <div class="invoice overflow-auto">                <div style="min-width: 600px">                    <header>                        <div class="row">                                    <div class="col">                                <a target="_blank" href="#"><img src="https://dropphi.com/assets/img/logo.png"                                        data-holder-rendered="true"></a>                            </div>                            <div class="col company-details">                                <h2 class="name">                                    <a target="_blank" href="#">Dropphi</a>                                </h2>                                <div>الأردن، إربد</div>                                <div class="phone">0000</div>                                <div>support@dropphi.com</div>                            </div>                                </div>                    </header>                            <main>                        <div class="row contacts">                                    <div class="col invoice-details">                                <h1 class="invoice-id">فاتورة الطلب <span class="font-bold">#9233</span></h1>                                <div class="date"><span class="font-bold">طريقة الدفع:</span> عند الاستلام</div>                            </div>                                    <div class="col invoice-to">                                <h2 class="to">owies.omari3</h2>                                <div class="address">0797048997</div>                                <div class="email"><a href="mailto:owies.omari3@gmail.com">owies.omari3@gmail.com</a></div>                            </div>                                </div>                        <div class="table-responsive pt-1">                            <table class="table table-bordered">                                <thead>                                    <tr>                                        <th>#</th>                                        <th>المنتج</th>                                        <th>سعر القطعة</th>                                        <th>الكمية</th>                                        <th>الإجمالي</th>                                    </tr>                                </thead>                                <tbody>                                    <tr>                                        <td>#1</td>                                        <td>سماعات MOXOM WL29</td>                                        <td>20 د.أ</td>                                        <td><span>1</span></td>                                        <td><span>20 د.أ</span></td>                                    </tr>                                    <tr>                                        <td>#2</td>                                        <td>m28</td>                                        <td>13 د.أ</td>                                        <td><span>1</span></td>                                        <td><span>13 د.أ</span></td>                                    </tr>                                    <tr>                                        <td>#3</td>                                        <td>جهاز شفط الهواء</td>                                        <td>9 د.أ</td>                                        <td><span>1</span></td>                                        <td><span>9 د.أ</span></td>                                    </tr>                                    <tr>                                        <td>#4</td>                                        <td>منظفة زجاج مزدوج الجوانب</td>                                        <td>4 د.أ</td>                                        <td><span>1</span></td>                                        <td><span>4 د.أ</span></td>                                    </tr>                                    <tr>                                        <td>#5</td>                                        <td>وصلة كهرباء مع مداخل USB من MOXOM KH-63Y</td>                                        <td>14 د.أ</td>                                        <td><span>1</span></td>                                        <td><span>14 د.أ</span></td>                                    </tr>                                </tbody>                            </table>                        </div>                                <div class="row">                            <div class="col-6">                                <h4 class="pl-2 pt-2 pb-2">تفاصيل الشحن</h4>                                <table class="table table-bordered mt-3">                                    <tbody>                                        <tr>                                            <td>الاسم</td>                                            <td>Test</td>                                        </tr>                                        <tr>                                            <td>المتجر</td>                                            <td>Test</td>                                        </tr>                                        <tr>                                            <td>رقم الهاتف</td>                                            <td class="phone">0797048997</td>                                        </tr>                                        <tr>                                            <td>الدولة</td>                                            <td>الأردن</td>                                        </tr>                                        <tr>                                            <td>المدينة</td>                                            <td>Ajloon</td>                                        </tr>                                        <tr>                                            <td>العنوان</td>                                            <td>Testtt</td>                                        </tr>                                    </tbody>                                </table>                            </div>                            <div class="col-6">                                <h4 class="pl-2 pt-2 pb-2">ملخص الطلب</h4>                                <div class="cart_totals calculated_shipping">                                    <table class="table table-bordered">                                        <tbody>                                            <tr class="cart-subtotal">                                                <th>إجمالي سعر المنتجات</th>                                                <th>                                                    <span>60 د.أ</span>                                                </th>                                            </tr>                                            <tr class="cart-tax">                                                <td>تكلفة شحن الطلب</td>                                                <td>                                                    <span>2.75 د.أ</span>                                                </td>                                            </tr>                                            <tr class="order-total">                                                <td>النهائي</td>                                                <td>                                                    <strong>                                                        <span>62.75 د.أ</span>                                                    </strong>                                                </td>                                            </tr>                                        </tbody>                                    </table>                                </div>                            </div>                        </div>                    </main>                </div>                <div>                </div>            </div>        </div>    </body></html>'


    mywindow?.document.write(content);
    /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    mywindow?.print();
    mywindow?.close();

    return true;
  }

  cancelOrder() {
    this.alert.showSpinner();
    var textArea = (document.getElementById("reason") as HTMLTextAreaElement)
    this.globalorderDeatialsService.deleteOrder(this.orderNumber!, textArea.value).subscribe(res => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("s", "تمت العملية بنجاح", "تم الغاء الطلب بنجاح");
      setTimeout(function () {
        window.location.reload();
      }, 1000)
    }, err => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.alert.showSpinner();
    this.globalorderDeatialsService.getOrderDetails(this.orderNumber!).subscribe(res => {
      this.orderDeails = res;
      this.textAreadDisabled = this.orderDeails.orderDetails.orderStatus == "CANCELLED" ? true : false
      var contentContainer: HTMLDivElement = document.getElementById("container") as HTMLDivElement
      this.alert.hideSpinner();
      contentContainer.style.display = "block";
    }, err => {
      this.alert.hideSpinner();
      this.alert.setupAlertDiv("e", "حدث خطأ", "حدث خطأ، الرجاء المحاولة لاحقاً");
    })
  }
}
