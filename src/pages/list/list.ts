import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/Pet'
import { PetListService } from '../../services/pet-list/pet-list.service';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../services/toast/toast.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  petList$: Observable<Pet[]>;
  pet: Pet;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public petService: PetListService,
    public toast: ToastService,
    private angularFireAuth: AngularFireAuth,
    private qrScanner: QRScanner
  ) {

    this.angularFireAuth.authState.subscribe(data => {
      this.petList$ = this.petService
        .getPetsByUser(data.email) // gets DB list
        .snapshotChanges() // key and value
        .map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
        );
    })
  }

  deletePet(pet) {
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

  addViaBarcode() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

}
