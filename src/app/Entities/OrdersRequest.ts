export class OrdersRequest {
    productInfos: ProductInfo[] = [];
    customerShipmentDetails: CustomerShipmentDetails = new CustomerShipmentDetails();
    paymentMethod: string = "";
}

export class CustomerShipmentDetails {
    name: string = "";
    country: string = "";
    city: string = "";
    phoneNumber: string = "";
    storeName: string = "";
    address: string = "";
    notes: string = "";
}

export class ProductInfo {
    sku: string = "";
    sellingPrice: number = 0;
    quantity: number = 0;
    totalPrice: number = 0;
}
