import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailfotoPage } from './detailfoto.page';

const routes: Routes = [
  {
    path: '',
    component: DetailfotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailfotoPageRoutingModule {}
