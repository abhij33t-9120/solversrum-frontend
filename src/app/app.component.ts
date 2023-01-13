import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductsService } from 'src/app/services/product/products.service';
import { Router } from '@angular/router';
import { Customer } from './models/Customer';
import { SignIn } from './models/SignIn';
import { CustomerService } from './services/customer/customer.service';
import { LandingService } from './services/landing/landing.service';
import { ModalService } from './services/modal/modal.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'solversrum-frontend';
  cartSize: number = 0
  adminState: number = 0
  customerVo = new Customer()
  message: string = ''
  toastState: boolean = false
  user: SignIn = new SignIn()
  currentUser: SignIn = null
  @ViewChild('welcome__modal') welcome
  @ViewChild('signInModal') signInModal
  constructor(private router: Router, private productService: ProductsService, public modalService: ModalService, public landingService: LandingService, private customerService: CustomerService) {
    this.cartSize = this.productService.cartListSet.size
    this.productService.cartListModified.subscribe(() => {
      this.cartSize = this.productService.cartListSet.size
    })
    this.landingService.setUser()
    this.currentUser = this.landingService.user
    this.landingService.userState.subscribe(() => {
      this.currentUser = this.landingService.user
    })
  }
  ngAfterViewInit() {
    this.modalService.open(this.welcome)
    setTimeout(() => this.modalService.modalService.dismissAll(), 4000)
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

  SignInorOut() {
    if (localStorage.getItem('user') != null) {
      localStorage.clear()
      this.message = 'Signed out successfully!!'
      this.user = new SignIn()
      this.productService.cartList = []
      this.productService.cartListSet.clear()
      this.productService.cartListModified.next()
      this.landingService.setUser()
      this.toastState = true
      setTimeout(() => this.toastState = false, 3000)
      this.router.navigate([''])
    }
    else {
      this.modalService.open(this.signInModal)
    }

  }

  signIn() {
    if (this.user.userId == 9910 && this.user.userName == 'Admin') {
      this.user.isAdmin = true
      localStorage.setItem('user', JSON.stringify(this.user));
      this.landingService.setUser()
      this.message = 'Signed in as Admin.'
      this.toastState = true
      setTimeout(() => this.toastState = false, 3000)
      this.router.navigate([''])

    } else {
      this.customerService.getCustomerbyId(this.user.userId).subscribe({
        next: res => {
          if (res.customerName == this.user.userName) {
            this.user.isAdmin = false
            localStorage.setItem('user', JSON.stringify(this.user));
            this.message = 'Logged In successfully !!'
          } else {
            this.message == 'UserName or Password incorrect! Try again.'
          }
          this.router.navigate(['/products'])

        },
        error: err => {
          this.message = 'UserName or Password incorrect! Try again.'
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
        },
        complete: () => {
          this.landingService.setUser()
          this.toastState = true
          setTimeout(() => this.toastState = false, 3000)
        }
      })
    }

  }
}
