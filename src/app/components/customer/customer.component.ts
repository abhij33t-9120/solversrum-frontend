import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { SignIn } from 'src/app/models/SignIn';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LandingService } from 'src/app/services/landing/landing.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = []
  customerVo: Customer = new Customer()
  message: string = ''
  toastState: boolean = false
  editBtnState: boolean = false
  currentUser: SignIn = null
  constructor(private customerService: CustomerService, private landingService: LandingService, public modalService: ModalService) { }

  @ViewChild('addModal') addModal

  ngOnInit(): void {
    this.getCustomers()
    this.customerService.CustomerSubject.subscribe(
      () => this.getCustomers()
    )
    this.currentUser = this.landingService.user
    this.landingService.userState.subscribe(() => {
      this.currentUser = this.landingService.user
    })
  }

  addOrEditCustomer() {
    if (this.editBtnState)
      this.editCustomer()
    else
      this.addCustomer()
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe({
      next: res => this.customers = res,
      error: error => {
        this.message = error.error
        this.toastState = true
        setTimeout(() => this.toastState = false, 3000)
      }
    })
  }

  deleteCustomer(id) {
    this.customerService.deleleCustomer(id).subscribe({
      next: res => {
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
  }

  addCustomer() {
    this.customerService.addCustomer(this.customerVo)
      .subscribe({
        next: res => {
          this.message = res;
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
        },
        error: error => {
          this.message = error.error
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
        }
      });
    this.customerVo = new Customer();
  }

  editCustomer() {
    this.customerService.editCustomer(this.customerVo)
      .subscribe({
        next: res => {
          this.message = res;
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
        },
        error: error => {
          this.message = error.error
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
        }
      });
    this.customerVo = new Customer();
  }


  setEditCustomerId(customer) {
    this.editBtnState = true;
    this.customerVo = customer
    this.modalService.open(this.addModal)
  }

  setFormValue() {
    this.editBtnState = false
    this.customerVo = new Customer()
  }

}
