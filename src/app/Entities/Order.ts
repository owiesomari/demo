export class Order {
    private id: number;
    private date: Date;
    private customerName;
    private total: number;
    private url: string;
    private paymentMethod: string;
    private quantity: number;
    private status: string;
  
    constructor(id: number, date: Date, customerName: string, total: number, url: string, paymentMethod: string, quantity: number, status: string) {
      this.id = id;
      this.date = date;
      this.total = total;
      this.url = url;
      this.paymentMethod = paymentMethod;
      this.quantity = quantity;
      this.status = status;
      this.customerName = customerName;
    }
  
    getID(): number { return this.id; }
  
    getDate(): Date { return this.date; }
  
    getTotal(): number { return this.total; }
  
    geturl(): string { return this.url; }
  
    getPaymentMethod(): string { return this.paymentMethod; }
  
    getQuantity(): number { return this.quantity; }
  
    getStatus(): string { return this.status; }
  
    getCustomerName(): string { return this.customerName; }
  
    setID(id: number) { this.id = id; }
  
    setDate(date: Date) { this.date = date; }
  
    setTotal(total: number) { this.total = total; }
  
    seturl(url: string) { this.url = url; }
  
    setPaymentMethod(paymentMethod: string) { this.paymentMethod = paymentMethod; }
  
    setQuantity(quantity: number) { this.quantity = quantity; }
  
    setStatus(status: string) { this.status = status; }
  
    setCustomerName(customerName: string) { this.customerName = customerName; }
  
  }