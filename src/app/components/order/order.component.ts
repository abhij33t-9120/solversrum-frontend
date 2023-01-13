import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/services/order/order.service';
import { LandingService } from 'src/app/services/landing/landing.service';
import { SignIn } from 'src/app/models/SignIn';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[]
  closeResult: string = ""
  selectedOrder: Order = new Order()
  currentUser: SignIn = null
  constructor(private orderService: OrderService, public modalService: NgbModal, private landingService: LandingService) { }

  ngOnInit(): void {
    this.currentUser = this.landingService.user
    this.landingService.userState.subscribe(() => {
      this.currentUser = this.landingService.user
    })
    this.getOrders()
  }

  getOrders() {
    this.orderService.getOrders(this.currentUser.userId).subscribe({
      next: res => {
        this.orders = res
        for (let i = 0; i < res.length; i++) {
          this.orders[i].total = this.findAmount(res[i].orderDetailsVo)
        }
      },
      error: error => alert(error.error)
    })
  }

  findAmount(orderDetails) {
    let amount = 0
    for (let o of orderDetails) {
      amount += o.quantity * o.productVo.price
    }
    return amount
  }

  open(content: any, current) {
    let modalRef = this.modalService.open(content)
    this.selectedOrder = current
    modalRef.result.then((result) => {
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
}
