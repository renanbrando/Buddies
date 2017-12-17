import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification';
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
    public toast: ToastService,
    private localNotification: PhonegapLocalNotification
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
      console.log(Number(this.event.date.slice(0,4)),
      Number(this.event.date.slice(5,7)),
      Number(this.event.date.slice(8,11)),
      Number(this.event.time.slice(0,2)),
      Number(this.event.time.slice(3.6)));
      this.localNotification.requestPermission().then(
        (permission) => {
          if (permission === 'granted') {
      
            // Create the notification
            this.localNotification.create('New Event', {
              tag: 'message',
              body: 'Event ' + this.event.description + ' created',
              icon: '../../assets/imgs/logo.png'
            });
      
          }
        });
      // Schedule delayed notification
      /* this.localNotifications.schedule({
        text: 'Delayed ILocalNotification',
        at: new Date( Number(this.event.date.slice(0,4)),
                      Number(this.event.date.slice(5,7)),
                      Number(this.event.date.slice(8,11)),
                      Number(this.event.time.slice(0,2)),
                      Number(this.event.time.slice(3.6))
                    ),
        led: 'FF0000',
        sound: null
      }); */
      this.toast.show("Event created.");
      this.navCtrl.pop();
    });
  }

}
