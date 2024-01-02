import { Component, Input, OnInit } from '@angular/core';
import { Recepie } from '../services/data.service';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  @Input() recepie!: Recepie;
  constructor(public modalCtrl: ModalController,
    private dataService: DataService) { }
    async dismiss() {
      await this.modalCtrl.dismiss();
    }
  ngOnInit() {
  }
  async updateRecepie() {
    await this.dataService.updateRecepie(this.recepie);
    this.dismiss();
  }

}
