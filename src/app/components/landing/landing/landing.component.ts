import { Component, OnInit } from '@angular/core';
import { SignIn } from 'src/app/models/SignIn';
import { LandingService } from 'src/app/services/landing/landing.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  images: string[] = [1, 2, 3, 4, 5].map(n => 'assets/carousel/carousel' + n + '.jpg')
  currentUser: SignIn = null
  constructor(public modalService: ModalService, private landingService: LandingService) {

  }

  ngOnInit() {
    this.currentUser = this.landingService.user
    this.landingService.userState.subscribe(
      () => this.currentUser = this.landingService.user
    )
  }
}
