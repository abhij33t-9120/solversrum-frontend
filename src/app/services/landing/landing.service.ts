import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SignIn } from 'src/app/models/SignIn';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  adminState: number = 0
  adminStateChanged = new Subject<void>()
  user: SignIn = null
  userState = new Subject<void>()
  constructor() { }
  setUser() {
    if (localStorage.length == 0) {
      this.user = null
    } else {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    this.userState.next()

  }

}
