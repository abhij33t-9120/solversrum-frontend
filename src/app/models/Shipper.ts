export interface Shipper{
    shipperId : number,
    shipperName : string,
    phone : number
}

export class ShipperVo implements Shipper{
    shipperId: number;
    shipperName: string;
    phone: number;
    
}