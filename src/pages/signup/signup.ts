import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { User } from '../../models/User';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastService } from '../../services/toast/toast.service';

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

  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public authService: AuthProvider, 
    public toast: ToastService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createAccount() {
    if (this.form.form.valid) {

      this.authService.createUser(this.user)
        .then((user: any) => {
          user.sendEmailVerification();

          this.toast.show('User created.');

          this.navCtrl.setRoot("ListPage");
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            this.toast.show('E-mail is already in use.');
          } else if (error.code  == 'auth/invalid-email') {
            this.toast.show('Invalid e-mail..');
          } else if (error.code  == 'auth/operation-not-allowed') {
            this.toast.show('Create users is not available.');
          } else if (error.code  == 'auth/weak-password') {
            this.toast.show('Password is weak.');
          }
        });
    }
  }

}
