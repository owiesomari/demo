export class Cart {
    image: Image = new Image();
    productName: string = "";
    sku: string = "";
    costPrice: number = 0;
    suggestedPrice: number = 0;
    quantity: number = 0;
}

export class Image {
    id: string = "";
    name: string = "";
    type: string = "";
    image: string[] = [];
}