export interface Product{
    productId : number
    productName : string
    unit : number
    price : number
    supplierId : number
    addBtnState : boolean
    imgUrl : string
}

export class ProductVo implements Product{
    imgUrl: string
    addBtnState: boolean = false
    productId: number
    productName: string
    unit: number
    price: number
    supplierId: number
}