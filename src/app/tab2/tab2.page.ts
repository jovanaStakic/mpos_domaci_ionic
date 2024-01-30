import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 
import { Tab1Page } from '../tab1/tab1.page';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers:[Tab1Page]
})
export class Tab2Page {
  email!: string;
  numberOfRecepies!: number;
  userId!:string;
  num$!:Observable<number>;
  sub!: Subscription;
 
  constructor(
    private authService:AuthService,
    private router: Router,
    private dataService:DataService
  ) {}
  ionViewDidEnter() {
    this.userId = this.authService.userId;
    this.num$ = this.dataService.getRecepiesCount(this.userId);
    this.takeEmail();
  }
  async takeEmail(){
    this.email = this.authService.email;
  }
async logout(){
  await this.authService.logout();
  this.router.navigateByUrl('login',{replaceUrl:true});
}

}
