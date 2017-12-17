import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/Pet';
import { Event } from '../../models/Event';
import { ToastService } from '../../services/toast/toast.service';
import { PetListService } from '../../services/pet-list/pet-list.service';

/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {

  event: Event;
  pet: Pet;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public petService: PetListService,
    public toast: ToastService
  ) {
    this.pet = this.navParams.get("pet");
    this.event = new Event();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  addEvent(){
    if (!this.pet.events){
      this.pet.events = [];
    }
    this.pet.events.push(this.event);
    this.petService.editPet(this.pet).then(()=> {
      this.toast.show("Event added.");
      this.navCtrl.pop();
    });
  }

}
