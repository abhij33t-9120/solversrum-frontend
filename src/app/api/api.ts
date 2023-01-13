export class Api {
    public static readonly base = 'http://localhost:8050/api/v1'
    public static readonly productApi = Api.base+'/products'
    public static readonly supplierApi = Api.base+'/suppliers'
    public static readonly shipperApi = Api.base+'/shippers'
    public static readonly customerApi = Api.base+'/customers'
    public static readonly orderApi = Api.base+'/orders'
}
