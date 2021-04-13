import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FotoserviceService } from '../fotoservice.service';


import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory, Plugins } from '@capacitor/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
const { Camera,Filesystem,Storage } = Plugins;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  


  constructor(public pindahtab: NavController,public afs:AngularFirestore, public fotoService:FotoserviceService,public toastCtrl:ToastController,private route:ActivatedRoute,) {}

  opendetail(counter){
    this.pindahtab.navigateForward(["/detailfoto/"+counter]);
  }


}
