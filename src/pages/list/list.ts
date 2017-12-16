import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/Pet'
import { PetListService } from '../../services/pet-list/pet-list.service';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../services/toast/toast.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList } from 'angularfire2/database/interfaces';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  petList$: Observable<Pet[]>;
  pet : Pet;
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public petService: PetListService, 
    public toast: ToastService, 
    private authService: AuthProvider,
    private angularFireAuth: AngularFireAuth,
  ) {

    this.angularFireAuth.authState.subscribe(data => {
      this.petList$ = this.petService
      .getPetsByUser(data.email) // gets DB list
      .snapshotChanges() // key and value
      .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ... c.payload.val()
          }))
        }
      );
    })
  }

  deletePet(pet){
    let alert = this.alertCtrl.create({
      title: 'Confirm deletion',
      message: `Are you sure you wanto to delete ${pet.name}?`,
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
            this.petService.removePet(pet).then(() => {
              this.toast.show("Pet deleted.");
              this.navCtrl.setRoot("ListPage");
            });
          }
        }
      ]
    });
    alert.present(); 
  }

}
