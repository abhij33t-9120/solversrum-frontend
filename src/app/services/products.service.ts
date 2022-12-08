import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductVo } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient: any;

  
  constructor(
    httpClient : HttpClient
  ) { 
    this.httpClient = httpClient;
  }

  getProducts() {
    console.log("on getProducts")
    return this.httpClient.get('http://localhost:8050/api/v1/products')
  }

  addProducts(product : ProductVo){
    return this.httpClient.post('http://localhost:8050/api/v1/products',{list : [product]}, {responseType : 'text'})
  }
}
