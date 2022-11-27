export class ManageProductsResponse {
    allProducts: AllProduct[] = [];
}

export class AllProduct {
    name: string = "";
    categories: string[] = [];
    costPrice: number = 0;
    sellPrice: number = 0;
    costPriceOnDropphi: number = 0;
    suggestedPrice: number = 0;
    discountPrice: number = 0;
    stock: number = 0;
    show: boolean = false;
    markAsSpecial: boolean = false;
    shippedFrom: string = "";
    additionDate: Date = new Date();
    preparationPeriod: string = "";
    limited: boolean = false;
    description: string = "";
    sku: string = "";
    weight: number = 0;
    images: Image[] = [];
    warranty: string = "";
    madeIn: string = "";
    original: boolean = false;
    quality: string = "";
    color: string = "";
    brand: string = "";
    dimension: string = "";
    marketingVideoUrl: string = "";
    tutorialVideoUrl: string = "";
    active: boolean = false;
}

export class Image {
    name: string = "";
    type: string = "";
    image: string = "";
}
