export class AdminOrdersExcelModel {
    private orderNumber = "";
    private sku = "";
    private count = 0;
    private costPrice = 0;
    private totalCostPrice = 0;
    private sellingPrice = 0;
    private totalSellingPrice = 0;
    private costOnDropphi = 0;
    private totalCostOnDropphi = 0;
    private marketerEmail = "";
    private marketerUserName = "";
    private marketerPnone = "";
    private customerName = "";
    private customerPhone = "";
    private country = "";
    private city = "";
    private address = "";
    private orderLink = "";
    private orderStatus = "";
    private orderDate = new Date();
    private orderCompletionDate = new Date();

    constructor(orderNumber: string, sku: string, count: number, costPrice: number, totalCostPrice: number, sellingPrice: number, totalSellingPrice: number, costOnDropphi: number,
        totalCostOnDropphi: number, marketerEmail: string, marketerUserName: string, marketerPnone: string, customerName: string, customerPhone: string, country: string,
        city: string, address: string, orderLink: string, orderStatus: string, orderDate: Date, orderCompletionDate: Date) {

        this.orderNumber = orderNumber;
        this.sku = sku;
        this.count = count;
        this.costPrice = costPrice;
        this.totalCostPrice = totalCostPrice;
        this.sellingPrice = sellingPrice;
        this.totalSellingPrice = totalSellingPrice;
        this.costOnDropphi = costOnDropphi;
        this.totalCostOnDropphi = totalCostOnDropphi;
        this.marketerEmail = marketerEmail;
        this.marketerUserName = marketerUserName;
        this.marketerPnone = marketerPnone;
        this.customerName = customerName;
        this.customerPhone = customerPhone;
        this.country = country;
        this.city = city;
        this.address = address;
        this.orderLink = orderLink;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;
        this.orderCompletionDate = orderCompletionDate;
    }
}