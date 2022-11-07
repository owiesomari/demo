export class OrderDetails {
    productsInfo: ProductsInfo[] = [];
    customerShipmentDetails: CustomerShipmentDetails = new CustomerShipmentDetails();
    orderDetails: OrderDetailsClass = new OrderDetailsClass();
    marketerInfo: MarketerInfo = new MarketerInfo();
    cancellationReason: string = "";
    orderBrief: OrderBrief = new OrderBrief();
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
    name: string = "";
    phoneNumber: string = "";
    email: string = "";
}

export class OrderBrief {
    totalProductsCostPrice: number = 0;
    totalCostAmount: number = 0;
    totalCustomerAmount: number = 0;
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
    orderLink: string = "";
}

export class ProductsInfo {
    productImage: ProductImage = new ProductImage();
    productName: string = "";
    costPrice: number = 0;
    sellingPrice: number = 0;
    quantity: number = 0;
    totalPrice: number = 0;
}

export class ProductImage {
    id: string = "";
    name: string = "";
    type: string = "";
    image: string[] = []
}
