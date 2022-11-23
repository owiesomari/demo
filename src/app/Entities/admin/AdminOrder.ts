export class AdminOrder {
    orderNumber: string = "";
    orderDate: Date = new Date();
    orderCompletionDate: Date = new Date();;
    orderLink: string = "";
    marketerInfo: MarketerInfo = new MarketerInfo();
    totalProductsCostPrice: number = 0;
    totalSellingPrice: number = 0;
    totalCustomerAmount: number = 0;
    totalMarketerAmount: number = 0;
    paymentMethod: string = "";
    orderStatus: string = "";
    productsInfo: ProductsInfo[] = [];
    customerShipmentDetails: CustomerShipmentDetails = new CustomerShipmentDetails();
}

export class CustomerShipmentDetails {
    customerName: string = "";
    storeName: string = "";
    phoneNumber: string = "";
    country: string = "";
    city: string = "";
    address: string = "";
    notes: string = "";
}

export class MarketerInfo {
    userName: string = "";
    phoneNumber: string = "";
    email: string = "";
}

export class ProductsInfo {
    sku: string = "";
    sellingPrice: number = 0;
    costPrice: number = 0;
    quantity: number = 0;
    totalPrice: number = 0;
    costPriceOnDropphi: number = 0;
}