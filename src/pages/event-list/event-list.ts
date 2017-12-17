import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/Pet';
import { Event } from '../../models/Event';
import { PetListService } from '../../services/pet-list/pet-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  pet: Pet;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public petService: PetListService,
    public toast: ToastService
  ) {
    this.pet = this.navParams.get("pet");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

  deleteEvent(event: Event){
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: 'Are you sure you wanto to delete this event?',
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
            const index = this.pet.events.indexOf(event);
            this.pet.events.splice(index, 1);
        
            this.petService.editPet(this.pet).then(() => {
              this.toast.show("Event Deleted");
            }); 
          }
        }
      ]
    });
    alert.present(); 
  }
}
