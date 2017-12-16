import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/Pet';
import { PetListService } from '../../services/pet-list/pet-list.service';
import { ToastService } from '../../services/toast/toast.service';
import { AuthProvider } from '../../providers/auth/auth';

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
    private authService: AuthProvider
  ) {
    this.pet = new Pet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPetPage');
  }

  addPet(pet: Pet){
    pet.owner_id = this.authService.getUser();
    this.petService.addPet(pet).then(ref => {
      console.log(ref.key);
      this.toast.show(`${pet.name} added.`);
      this.navCtrl.setRoot("ListPage");
    }); 
  }

}
