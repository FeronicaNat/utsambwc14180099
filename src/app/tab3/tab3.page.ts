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
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public afs:AngularFirestore, public fotoService:FotoserviceService,public toastCtrl:ToastController,private route:ActivatedRoute,) {}

}
