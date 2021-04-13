import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'detailfoto',
    loadChildren: () => import('./detailfoto/detailfoto.module').then( m => m.DetailfotoPageModule)
  },
  {
    path: 'detailfoto/:index',
    loadChildren: () => import('./detailfoto/detailfoto.module').then( m => m.DetailfotoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
