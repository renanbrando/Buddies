import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/Pet';
import { Event } from '../../models/Event';
import { PetListService } from '../../services/pet-list/pet-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the AddPetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-pet',
  templateUrl: 'add-pet.html',
})
export class AddPetPage {

  pet: Pet;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public petService: PetListService,
    public toast: ToastService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.pet = new Pet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  addPet(pet: Pet){
    this.angularFireAuth.authState.subscribe(data => {
      pet.owner_id = data.email;
      pet.events.push({description: "hello", date: "2017-01-01", time: "08:00"});
      console.log(pet);
      this.petService.addPet(pet).then(ref => {
        console.log(ref.key);
        this.toast.show(`${pet.name} added.`);
        this.navCtrl.setRoot("ListPage");
      }); 
    });
  }


}
