import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2'
import { AngularFireAuthModule} from 'angularfire2/auth'
import { AngularFireDatabaseModule} from 'angularfire2/database'

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { PetListService } from '../services/pet-list/pet-list.service';
import { ToastService } from '../services/toast/toast.service';
import { AuthProvider } from '../providers/auth/auth';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalNotifications,
    QRScanner,
    PetListService,
    ToastService,
    AuthProvider
  ]
})
export class AppModule {}
