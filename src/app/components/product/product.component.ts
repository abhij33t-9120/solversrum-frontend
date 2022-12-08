import { Component, OnInit } from '@angular/core';
import { Product, ProductVo } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products : Product[];
  addBtnState : boolean = false;
  range : number = 0;
  productVo : ProductVo = new ProductVo();
  private productService : ProductsService;
  constructor(productService : ProductsService) { 
    this.productService = productService;
  }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe(res =>{
      this.products = res;
    });
  }

  addProducts(){
    console.log(this.productVo)
    this.productService.addProducts(this.productVo)
    .subscribe(res => {
      alert(res)
    }, 
    (error: any) => {
      console.log(error)
        alert(error.error)
    })
  }



}
