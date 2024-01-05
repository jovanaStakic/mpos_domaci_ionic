import { Component, ViewChild } from '@angular/core';
import { DataService, Recepie } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UpdatePage } from '../update/update.page';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
  
})
export class Tab1Page {
  myId!: number;
  title!: string;
  difficulty!: number;
  description!: string;
  date!:string;
  isModalAddOpen = false;
  isModalUpdateOpen = false;
  sub!: Subscription;
  recepies: any;
  userId!:string;

  constructor(public modalCtrl: ModalController,
    private dataService: DataService,private authService:AuthService) {}
    ngOnInit() {
      this.userId=this.authService.userId;
      this.getData();
      /* this.dataService.getRecepies(this.userId).subscribe(res=>{
        console.log("My recepies: ",res);
       
      }); */
      
      
    }
    
    setAddOpen(isOpen: boolean) {
    this.isModalAddOpen = isOpen;
  }
  setUpdateOpen(isOpen: boolean) {
    this.isModalUpdateOpen = isOpen;

  }
  async goToUpdatePage(recepie:Recepie) {
    const modal = await this.modalCtrl.create({
      component: UpdatePage,
      componentProps: {recepie},
    });
    return await modal.present();
  }
  
    async getData() {
      this.sub = await this.dataService.getRecepies(this.userId).subscribe((res) => {
        this.recepies = res;
        console.log(this.recepies);
      });
    }
    

  
  
  async addRecepie() {
    await this.dataService.addRecepie({
      userId:this.userId,
      title: this.title,
      date: new Date().toLocaleString(),
      description: this.description,
      difficulty: this.difficulty,
    });
    this.title = '';
    this.description = '';
    this.difficulty = 0;
    this.setAddOpen(false);
  }
  async deleteRecepie(recepie: Recepie) {
    await this.dataService.deleteRecepie(recepie);
  }

  
}