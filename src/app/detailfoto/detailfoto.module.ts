import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailfotoPageRoutingModule } from './detailfoto-routing.module';

import { DetailfotoPage } from './detailfoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailfotoPageRoutingModule
  ],
  declarations: [DetailfotoPage]
})
export class DetailfotoPageModule {}
