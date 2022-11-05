export class Order {
  orderNumber: string = "";
  orderDate: Date = new Date();
  orderStatus: string = "";
  paymentMethod: string = "";
  customerName: string = "";
  totalPrice: number = 0;
  orderLink: string = "";
  productsCount: number = 0;
}