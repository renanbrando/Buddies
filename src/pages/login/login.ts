import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { User } from '../../models/User';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastService } from '../../services/toast/toast.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private toast: ToastService,
    private authService: AuthProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    if (this.form.form.valid) {
      const res = this.authService.signIn(this.user)
        .then(() => {
          this.navCtrl.setRoot("ListPage");
          console.log(res);
        })
        .catch((error: any) => {
          if (error.code == 'auth/invalid-email') {
            this.toast.show('E-mail is not valid.');
          } else if (error.code == 'auth/user-disabled') {
            this.toast.show('The user is desactivated.');
          } else if (error.code == 'auth/user-not-found') {
            this.toast.show('User was not found.');
          } else if (error.code == 'auth/wrong-password') {
            this.toast.show('Wrong password.');
          }
        });
    }
  }

  signUp() {
    //Shows signup screen(modal)
    let modal = this.modalCtrl.create("SignupPage");
    modal.present();
  }

  resetPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Enter your e-mail account",
      inputs: [
        {
          name: 'mail',
          placeholder: 'E-mail'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            this.authService.resetPassword(data.mail)
            .then(() => {
              this.toast.show('Request sent to your e-mail.')
  
            })
            .catch((error: any) => {
              if (error.code == 'auth/invalid-email') {
                this.toast.show('Invalid e-mail.');
              } else if (error.code == 'auth/user-not-found') {
                this.toast.show('User was not found.');
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
