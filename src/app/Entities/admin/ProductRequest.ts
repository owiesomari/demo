export class ProductRequest {
    name: string = "";
    categories: string[] = [];
    costPrice: number = 0;
    sellPrice: number = 0;
    suggestedPrice: number = 0;
    discountPrice: number = 0;
    stock: number = 0;
    show: boolean = false;
    markAsSpecial: boolean = false;
    limited: boolean = false;
    marketers: string[] = [];
    description: string = "";
    sku: string = "";
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

    costPriceOnDropphi:number=0;
    preparationPeriod:string="";
    shippedFrom:string="";

}

export class Image {
    name: string | undefined = "";
    type: string | undefined = "";
    image: string | undefined = "";
}
