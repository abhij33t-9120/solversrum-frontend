import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { Order, OrderDetails } from 'src/app/models/Order';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Cart[]
  customerId: number
  closeResult: string = ""
  constructor(private cartService: CartService, private productService: ProductsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartList()
    console.log(this.cartList)
  }

  removeItem(remove_item) {
    this.cartList = this.cartList.filter((item) => item != remove_item)
    this.productService.cartList = this.productService.cartList.filter((item) => item.productId != remove_item.productId)
    this.productService.cartListSet.delete(remove_item.productId)
    this.productService.cartListModified.next()
  }


  increment(index) {
    this.cartList[index].quantity += 1
  }

  decrement(index) {
    if (this.cartList[index].quantity > 1)
      this.cartList[index].quantity -= 1
  }

  order() {
    let order: Order = new Order()
    let orderDetails: OrderDetails[] = []
    order.orderDate = new Date().toISOString().slice(0, 10)
    this.cartService.getShippers().subscribe(res => {
      let shipperList: any = res
      order.shipperId = shipperList[Math.floor(Math.random() * shipperList.length)].shipperId
      order.customerId = this.customerId
      this.cartList.forEach(p => {
        let orderDetail = new OrderDetails()
        orderDetail.productId = p.productId
        orderDetail.quantity = p.quantity
        orderDetails.push(orderDetail)
      })
      order.orderDetailsVo = orderDetails
      this.cartService.order(order).subscribe(
        res => alert(res),
        error => alert(error.error)
      )
    })

  }

  open(content: any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getShippers() {
    let shipperList: any = []
    this.cartService.getShippers().subscribe(res => shipperList = res)
    return shipperList
  }
}
