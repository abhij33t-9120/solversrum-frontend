export class Order{
    orderDate : string
    customerId : number
    shipperId : number
    orderDetailsVo : OrderDetails[]
    
}


export class OrderDetails{
    quantity : number
    productId : number
}