

import { Component, OnInit } from '@angular/core';
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
  selector: 'app-detailfoto',
  templateUrl: './detailfoto.page.html',
  styleUrls: ['./detailfoto.page.scss'],
})
export class DetailfotoPage implements OnInit {

  constructor(private route:ActivatedRoute,public fotoService:FotoserviceService) { }

  public paramindex;
  public foto;
  public stat:boolean=false;

  ngOnInit() {
    var isinama=this.route.snapshot.paramMap.get('index');
    this.paramindex=isinama;
    

  }
  
  changestat(judulnote,isinote,tanggalnote,nilainote){
    this.stat=true;
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
    // this.fotoService.dataFoto.unshift(hasilsimpan);
    this.fotoService.dataupdate.unshift(hasilsimpan);

    console.log("CEKK "+this.fotoService.dataFoto);
    // Storage.set({
    //   key: this.fotoService.keyfoto,
    //   value:JSON.stringify(this.fotoService.dataFoto)
    // });

   
  }

  updatedata(judulnote,isinote,tanggalnote,nilainote){
    this.fotoService.updatedata(this.fotoService.dataupdate,judulnote,isinote,tanggalnote,nilainote,this.paramindex);
  }


}
