export class OrderDetails {
    productInfos: ProductInfo[] = [];
    customerShipmentDetails: CustomerShipmentDetails = new CustomerShipmentDetails();
    orderDetails: OrderDetailsClass = new OrderDetailsClass();
    marketerName: string = "";
    cancellationReason: string = "";
    orderBrief: OrderBrief = new OrderBrief();
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

export class OrderBrief {
    totalProductsCostPrice: number = 0;
    totalCostPrice: number = 0;
    orderShippingCost: number = 0;
    orderPreparationCost: number = 0;
    orderEarnings: number = 0;
    shippingPeriod: string = "";
}

export class OrderDetailsClass {
    orderNumber: string = "";
    orderDate: Date = new Date();
    orderStatus: string = "";
    paymentMethod: string = "";
    totalPrice: number = 0;
    orderLink: string = "";
    productsCount: number = 0;
}

export class ProductInfo {
    sku: string = "";
    sellingPrice: number = 0;
    quantity: number = 0;
    totalPrice: number = 0;
    iamge: string[] = [];
    costPrice: number = 0;
    description: string = "";
}
