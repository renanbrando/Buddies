import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pet } from '../../models/Pet'
import { PetListService } from '../../services/pet-list/pet-list.service';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../services/toast/toast.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NFC, Ndef } from '@ionic-native/nfc';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  petList$: Observable<Pet[]>;
  pet: Pet;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCrtl: LoadingController,
    public petService: PetListService,
    public toast: ToastService,
    private angularFireAuth: AngularFireAuth,
    private barcodeScanner: BarcodeScanner,
    private nfc: NFC,
    private ndef: Ndef
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

  addPetQR() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (!barcodeData.cancelled){
        let qrPet: string[] = [];
        let pet: Pet = new Pet();
        // Success! Barcode data is here
        console.log(barcodeData);
        // Receives data from QR code and pass it to a pet object
        qrPet = barcodeData.text.split("|");
        pet.name = qrPet[0];
        pet.gender = qrPet[1];
        pet.birthdate = qrPet[2];
        pet.species = qrPet[3];
        pet.race = qrPet[4];
        pet.color = qrPet[5];
        pet.weight = Number(qrPet[6]);
        pet.height = Number(qrPet[7]);
  
        // register pet with user's id
        this.angularFireAuth.authState.subscribe(data => {
          pet.owner_id = data.email;
          console.log(pet);
          this.petService.addPet(pet).then(ref => {
            console.log(ref.key);
            this.toast.show(`${pet.name} added.`);
            this.navCtrl.setRoot("ListPage");
          }); 
        });
      }
     }, (err) => {
         // An error occurred
         let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err,
          buttons: ['Dismiss']
        });
        alert.present();
     });
  }

  addViaNFC(){
    var nfcRead = [];
    let nfcPet: string[] = [];
    let pet: Pet = new Pet();
    this.loading = this.loadingCrtl.create({
      content: 'Reading NFC tags...'
    });

    this.loading.present().then(()=>{

      this.nfc.addNdefListener(() => {
        console.log('successfully attached ndef listener');
      }, (err) => {
        console.log('error attaching ndef listener', err);
      }).subscribe((event) => {
        console.log('received ndef message. the tag contains: ', event.tag);
        console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
        nfcRead = event.tag.ndefMessage[0]["payload"];
        console.log(this.nfc.bytesToString(nfcRead));
        nfcPet = this.nfc.bytesToString(nfcRead).split("|");
        pet.name = nfcPet[0];
        pet.gender = nfcPet[1];
        pet.birthdate = nfcPet[2];
        pet.species = nfcPet[3];
        pet.race = nfcPet[4];
        pet.color = nfcPet[5];
        pet.weight = Number(nfcPet[6]);
        pet.height = Number(nfcPet[7]);
        
        let alert = this.alertCtrl.create({
          title: 'Confirm import',
          message: `Are you sure you wanto to import ${pet.name}?`,
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
                this.angularFireAuth.authState.subscribe(data => {
                  pet.owner_id = data.email;
                  console.log(pet);
                  this.petService.addPet(pet).then(ref => {
                    console.log(ref.key);
                    this.toast.show(`${pet.name} added.`);
                    this.navCtrl.setRoot("ListPage");
                  }); 
                });
              }
            }
          ]
        });
        alert.present();
  
      });

      setTimeout(()=>{
        this.navCtrl.setRoot('ListPage');
        this.loading.dismiss();
      }, 10000);
    });
    
  }

}
