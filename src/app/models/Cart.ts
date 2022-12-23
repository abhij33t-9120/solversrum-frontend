import { Product } from "./Product";

export class Cart implements Product{
    productId: number;
    productName: string;
    unit: number;
    price: number;
    supplierId: number;
    addBtnState: boolean;
    quantity : number;
}