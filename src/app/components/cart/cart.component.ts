import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { Order, OrderDetails } from 'src/app/models/Order';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/product/products.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SignIn } from 'src/app/models/SignIn';
import { LandingService } from 'src/app/services/landing/landing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Cart[]
  customerId: number
  closeResult: string = ""
  toastState: boolean = false
  message: string = ''
  currentUser: SignIn
  constructor(private landingService: LandingService, private cartService: CartService, private productService: ProductsService, public modalService: ModalService) { }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartList()
    this.currentUser = this.landingService.user
    this.landingService.userState.subscribe(() => {
      this.currentUser = this.landingService.user
    })
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
    console.log(this.currentUser)
    if (this.currentUser == null) {
      this.message = 'Sign in to place an order..'
      this.toastState = true
      setTimeout(() => this.toastState = false, 3000)
    } else {
      let order: Order = new Order()
      let orderDetails: OrderDetails[] = []
      order.orderDate = new Date().toISOString().slice(0, 10)
      this.cartService.getShippers().subscribe(res => {
        let shipperList: any = res
        order.shipperId = shipperList[Math.floor(Math.random() * shipperList.length)].shipperId
        order.customerId = this.currentUser.userId
        this.cartList.forEach(p => {
          let orderDetail = new OrderDetails()
          orderDetail.productId = p.productId
          orderDetail.quantity = p.quantity
          orderDetails.push(orderDetail)
        })
        order.orderDetailsVo = orderDetails
        this.cartService.order(order).subscribe({
          next: res => {
            for (let cart of this.cartList) {
              let temp = cart
              console.log(temp)
              console.log(cart)
              temp.unit -= temp.quantity
              this.productService.editProduct(temp).subscribe()
            }
            this.cartList = []
            this.productService.cartList = []
            this.productService.cartListSet.clear()
            this.productService.cartListModified.next()
            this.message = res;

            this.toastState = true
            setTimeout(() => this.toastState = false, 3000)
          },
          error: error => {
            this.message = error.error
            this.toastState = true
            setTimeout(() => this.toastState = false, 3000)
          }
        })
      })
    }


  }

  getShippers() {
    let shipperList: any = []
    this.cartService.getShippers().subscribe(res => shipperList = res)
    return shipperList
  }
}
