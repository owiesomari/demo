export class Catalog {
    private id: number;
    private img: string;
    private title: string;
    private cost: number;
    private sellingPrice: string;
    private weight: number;
    private SKU: string;
    private countryOfManufacture: string;
    private guaranty: string;
    private quality: string;
    private discription: string;
    private category: string;
    //TODO(add dimentions)
     //TODO (add totoruial)

    constructor(id: number, img: string, title: string, cost: number, sellingPrice: string, weight: number, SKU: string, countryOfManufacture: string, guaranty: string, quality: string, discription: string, category: string) {
        this.id = id;
        this.img = img;
        this.title = title;
        this.cost = cost;
        this.sellingPrice = sellingPrice;
        this.weight = weight;
        this.SKU = SKU;
        this.countryOfManufacture = countryOfManufacture;
        this.guaranty = guaranty;
        this.quality = quality;
        this.discription = discription;
        this.category = category;
    }

    getID(): number { return this.id; }

    getImg(): string { return this.img; }

    getCategory(): string { return this.category; }

    getTitle(): string { return this.title; }

    getCost(): number { return this.cost; }

    getSellingPrice(): string { return this.sellingPrice; }

    getWeight(): number { return this.weight; }

    getSKU(): string { return this.SKU; }

    getDiscription(): string { return this.discription; }

    getQuaranty(): string { return this.guaranty; }

    getQuality(): string { return this.quality; }

    getCountryOfManufacture(): string { return this.countryOfManufacture; }

    getDimentions(): string {return this.SKU}// TODO(add dimentions)

    getTotorial():string {return this.SKU} //TODO (add totoruial)

}