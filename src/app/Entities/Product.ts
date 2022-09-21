export class Product {
    private id: number;
    private title: string;
    private cost: number;
    private sellingPrice: number;
    private status: String;

    constructor(id: number, title: string, cost: number, sellingPrice: number, status: String) {
        this.id = id;
        this.title = title;
        this.cost = cost;
        this.sellingPrice = sellingPrice;
        this.status = status;

    }

    getID(): number { return this.id; }

    getTitle(): string { return this.title; }

    getCost(): number { return this.cost; }

    getSellingPrice(): number { return this.sellingPrice; }

    getStatus(): String { return this.status }


    /* setID(id: number) { this.id = id; }
   
     setDate(date: Date) { this.date = date; }
   
     setTotal(total: number) { this.total = total; }
   
     seturl(url: string) { this.url = url; }
   
     setPaymentMethod(paymentMethod: string) { this.paymentMethod = paymentMethod; }
   
     setQuantity(quantity: number) { this.quantity = quantity; }
   
     setStatus(status: string) { this.status = status; }
   
     setCustomerName(customerName: string) { this.customerName = customerName; }
 
     */

}