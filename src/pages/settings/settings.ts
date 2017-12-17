import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PetListService } from '../../services/pet-list/pet-list.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public petService: PetListService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  mailUs(){
    window.open('mailto:reebrando@gmail.com, jumpercorderosa@gmail.com', '_system');
  }

  deleteData(){
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you entirely sure you want to delete all data from the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.petService.removeAll();
          }
        }
      ]
    });
    alert.present();
  }
}
