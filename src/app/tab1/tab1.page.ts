import { Component, ViewChild } from '@angular/core';
import { DataService, Recepie } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';


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
  

  constructor(public modalCtrl: ModalController,
    private dataService: DataService) {}
    ngOnInit() {

      this.getData();
      this.dataService.getRecepies().subscribe(res=>{
        console.log("My recepies: ",res);
       
      });
      
    }
    
    setAddOpen(isOpen: boolean) {
    this.isModalAddOpen = isOpen;
  }
  setUpdateOpen(isOpen: boolean) {
    this.isModalUpdateOpen = isOpen;

  }
  
  
    async getData() {
      this.sub = await this.dataService.getRecepies().subscribe((res) => {
        this.recepies = res;
        console.log(this.recepies);
      });
    }
    

  
  
  async addRecepie() {
    await this.dataService.addRecepie({
      title: this.title,
      date: new Date().toLocaleString(),
      description: this.description,
      difficulty: this.difficulty,
    });
    this.setAddOpen(false);
  }
  async deleteRecepie(recepie: Recepie) {
    await this.dataService.deleteRecepie(recepie);
  }

  
}