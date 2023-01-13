import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';
import { Product, ProductVo } from 'src/app/models/Product';
import { Api } from 'src/app/api/api';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _productListModified = new Subject<void>();
  cartList = []
  cartListSet = new Set();
  cartListModified = new Subject<void>();
  constructor(
    private httpClient: HttpClient
  ) {}
  

  get productListModified() {
    return this._productListModified;
  }

  getProducts(): Observable<Product[]> {
    console.log("on getProducts")
    return this.httpClient.get<Product[]>(Api.productApi)
  }

  addProducts(product: ProductVo): any {
    return this.httpClient.post(Api.productApi, { list: [product] }, { responseType: 'text' }).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  deleteProduct(id):any {
    return this.httpClient.delete(Api.productApi + '/' + id, { responseType: 'text' }).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  editProduct(product : ProductVo):any{
    return this.httpClient.put(Api.productApi + '/' + product.productId, product, {responseType: 'text'}).pipe(
      tap(() => {
        this._productListModified.next();
      })
    );
  }

  addCartList(productId){
    this.cartListSet.add(productId)
  }
  
}

