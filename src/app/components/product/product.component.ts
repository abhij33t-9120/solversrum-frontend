import { Component, OnInit } from '@angular/core';
import { Product, ProductVo } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  addBtnState: boolean = false;
  editBtnState: boolean = false;
  range: number = 0;
  productVo: ProductVo = new ProductVo();

  private productService: ProductsService;
  constructor(productService: ProductsService) {
    this.productService = productService;
  }

  ngOnInit(): void {
    this.getProducts()
    this.productService.productListModified.subscribe(res => {
      this.getProducts()
    })
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(res => {
        this.products = res;
      });
  }

  addProducts() {
    console.log(this.productVo)
    this.changeAddBtnState()
    this.productService.addProducts(this.productVo)
      .subscribe(res => {
        alert(res)
      },
        (error: any) => {
          console.log(error)
          alert(error.error)
        });
    this.productVo = new ProductVo();
  }

  changeAddBtnState() {
    this.addBtnState = !this.addBtnState
  }
  
  changeEditBtnState(){
    this.editBtnState = !this.editBtnState
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(res => {
        alert(res)
      })
  }

  editProduct() {
    this.productService.editProduct(this.productVo)
    .subscribe(res => {
      alert(res)
    })
  }

  setEditProductId(id){
    this.changeEditBtnState()
    this.productVo.productId = id
  }

}
