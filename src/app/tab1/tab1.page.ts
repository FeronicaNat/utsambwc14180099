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
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private platform:Platform;
  public foto; 

  constructor(platform:Platform,public afs:AngularFirestore, public fotoService:FotoserviceService,public toastCtrl:ToastController,private route:ActivatedRoute) {
    this.platform=platform;
  }

  ngOnInit(){
    this.fotoService.loadFoto();
  }

  async PilihFoto(){

    // this.fotoService.dataadd

    this.foto = await Camera.getPhoto({
      resultType : CameraResultType.Uri,
      source : CameraSource.Camera,
      quality : 100
    });

    console.log("Foto "+this.foto);

    
    const hasilsimpan=await this.fotoService.simpanFoto(this.foto);
    this.fotoService.dataFoto.unshift(hasilsimpan);
    this.fotoService.dataadd.unshift(hasilsimpan);


    console.log("CEKK "+this.fotoService.dataFoto);
    // Storage.set({
    //   key: this.fotoService.keyfoto,
    //   value:JSON.stringify(this.fotoService.dataFoto)
    // });

   
  }

  TambahNote(judulnote,isinote,tanggalnote,nilainote) {
    this.fotoService.tambahNote(this.foto,judulnote,isinote,tanggalnote,nilainote);
    judulnote=null; 
    isinote=null;
    tanggalnote=null;
    nilainote=null;

  }

  // addNewFoto(){
  //   this.fotoservice.dtFotoBaru = [];
  //   this.fotoservice.addFoto();
  //   //this.fotoservice.loadFoto();
  //   //this.fotoservice.loadFromCapture();
  // }

}
