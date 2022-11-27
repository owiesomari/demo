export class EditProductRequest {
    name: string = "";
    categories: string[] = [];
    costPriceOnDropphi: number = 0;
    costPrice: number = 0;
    sellPrice: number = 0;
    suggestedPrice: number = 0;
    discountPrice: number = 0;
    stock: number = 0;
    show: boolean = false;
    markAsSpecial: boolean = false;
    limited: boolean = false;
    description: string = "";
    newSku: string = "";
    oldSku: string = "";
    shippedFrom: string = "";
    preparationPeriod: string = "";
    weight: number = 0;
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
    images: Image[] = [];
    marketers: string[] = [];
}

export class Image {
    name: string = "";
    type: string = "";
    image: string = "";
}
