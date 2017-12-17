import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastService } from '../../services/toast/toast.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  password: string;
  cpassword: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthProvider,
    public angularFireAuth: AngularFireAuth,
    public toast: ToastService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  changePassword(){
    this.angularFireAuth.authState.subscribe(data => {
      this.authService.resetPassword(data.email);
        this.toast.show("Reset e-mail sent");
        this.navCtrl.setRoot("ListPage");
      }); 
  }

}
