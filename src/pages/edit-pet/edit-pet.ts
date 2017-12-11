import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/Pet';
import { PetListService } from '../../services/pet-list/pet-list.service';
import { ToastService } from '../../services/toast/toast.service';

/**
 * Generated class for the EditPetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-pet',
  templateUrl: 'edit-pet.html',
})
export class EditPetPage {

  pet: Pet;

  constructor(public navCtrl: NavController, public navParams: NavParams, public petService: PetListService, public toast: ToastService) {
    
  }

  ionViewWillLoad() {
    this.pet = this.navParams.get("pet");
  }

  editPet(pet){
    this.petService.editPet(pet).then(() => {
      this.toast.show(`${this.pet.name} saved.`);
      this.navCtrl.setRoot("ListPage");
    }); 
  }

}
