import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HintsPage } from './hints';

@NgModule({
  declarations: [
    HintsPage,
  ],
  imports: [
    IonicPageModule.forChild(HintsPage),
  ],
})
export class HintsPageModule {}
