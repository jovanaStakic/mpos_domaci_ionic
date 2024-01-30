import { Component, ViewChild } from '@angular/core';
import { DataService, Ingredient, Recepie } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import { Subscription, firstValueFrom } from 'rxjs';
import { UpdatePage } from '../update/update.page';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']

})
export class Tab1Page {
  title!: string;
  difficulty!: number;
  description!: string;
  date!: string;
  isModalAddOpen = false;
  isModalUpdateOpen = false;
  sub!: Subscription;
  recepies: any;
  userId!: string;
  allIngredients!: any;
  selectedIngredient!: Ingredient;
  recipeIngredients: Ingredient[] = [];

  constructor(public modalCtrl: ModalController,
    private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.userId = this.authService.userId;
    this.getData();

  }

  setAddOpen(isOpen: boolean) {
    this.getIngredients();
    this.isModalAddOpen = isOpen;
  }
  setUpdateOpen(isOpen: boolean) {
    this.isModalUpdateOpen = isOpen;

  }
  async goToUpdatePage(recepie: Recepie) {
    const modal = await this.modalCtrl.create({
      component: UpdatePage,
      componentProps: { recepie },
    });
    return await modal.present();
  }

  async getData() {
    try {
      this.recepies = await this.dataService.getRecepiesWithIngredients(this.userId);
    } catch (error) {
      console.error('Greška pri povlacenju recepata sa sastojcima:', error);
    }
  }




  async addRecepie() {
    const newRecepie = {
      myId: "",
      userId: this.userId,
      title: this.title,
      date: new Date().toLocaleString(),
      description: this.description,
      difficulty: this.difficulty,
      ingredients: this.recipeIngredients,
    };

    try {
      const recepieDocFromDB = await this.dataService.addRecepie(newRecepie);
      if (recepieDocFromDB) {
        newRecepie.myId = recepieDocFromDB;
        this.recepies.push(newRecepie);
      }
      this.title = '';
      this.description = '';
      this.difficulty = 0;
      this.recipeIngredients = [];
      this.setAddOpen(false);
    } catch (error) {

      console.error(error);
    }
  }
  async deleteRecepie(recepie: Recepie) {
    await this.dataService.deleteRecepie(recepie);
    this.recepies = this.recepies.filter((r: Recepie) => r.myId !== recepie.myId);
  }
  addIngredient() {
    if (this.selectedIngredient && !this.recipeIngredients.includes(this.selectedIngredient)) {
      this.recipeIngredients.push(this.selectedIngredient);
    }
  }
  async getIngredients() {
    this.allIngredients = await firstValueFrom(this.dataService.getIngredients());
  }
}