export class Cart {
    private id: number;
    private image:String;
    private decription:string;
    private cost: number;
    private sellingPrice: number;
    private qantity: number;
    private total:number;

    constructor(id: number,image:String, decription: string, cost: number, sellingPrice: number, qantity: number=1,total:number=0) {
        this.id = id;
        this.image=image;
        this.decription = decription;
        this.cost = cost;
        this.sellingPrice = sellingPrice;
        this.qantity = qantity;
        this.total=total

    }

    getID(): number { return this.id; }

    getImage():String{return this.image;}

    getDecription(): string { return this.decription; }

    getCost(): number { return this.cost; }

    getSellingPrice(): number { return this.sellingPrice; }

    getQantity(): number { return this.qantity }

    getTotal(): number { return this.total }

}