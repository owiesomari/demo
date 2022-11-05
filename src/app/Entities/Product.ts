export class Product {
    name:              string = "";
    category:          string = "";
    costPrice:         number = 0;
    sellPrice:         number = 0;
    suggestedPrice:    number = 0;
    discountPrice:     number = 0;
    stock:             number = 0;
    show:              boolean = false;
    markAsSpecial:     boolean = false;
    marketers:         string[] =[];
    description:       string = "";
    sku:               string = "";
    weight:            number = 0;
    images:            Image[] = [];
    warranty:          string = "";
    madeIn:            string = "";
    original:          boolean = false;
    quality:           string = "";
    color:             string = "";
    brand:             string = "";
    dimension:         string = "";
    marketingVideoUrl: string = "";
    tutorialVideoUrl:  string = "";
    active:            boolean = false;
}

export class Image {
    id:    string = "";
    name:  string = "";
    type:  string = "";
    image: string[]= [];
}