import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { User } from '../../models/User';
import { AngularFireAuth} from 'angularfire2/auth'

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public afAuth: AngularFireAuth
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  async dismiss(user: User) {
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(res);
      //Dismiss  singnup screen back to login
      this.viewCtrl.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

}
