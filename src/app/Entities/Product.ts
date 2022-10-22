export class Product {
    private id: number;
    private image:String;
    private title: string;
    private cost: number;
    private sellingPrice: number;
    private status: String;

    constructor(id: number,image:String, title: string, cost: number, sellingPrice: number, status: String) {
        this.id = id;
        this.image=image;
        this.title = title;
        this.cost = cost;
        this.sellingPrice = sellingPrice;
        this.status = status;

    }

    getID(): number { return this.id; }

    getImage():String{return this.image;}

    getTitle(): string { return this.title; }

    getCost(): number { return this.cost; }

    getSellingPrice(): number { return this.sellingPrice; }

    getStatus(): String { return this.status }
}