import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { CameraPhoto, CameraResultType, CameraSource, Capacitor, FilesystemDirectory, Plugins } from '@capacitor/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
const { Camera,Filesystem,Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class FotoserviceService {

  public keyfoto:string="foto";

  public sessionuser;
  public namafile;
  public dataFoto:Photo[]=[];
  public temptdata:DetNot[]=[];
  public isinote;
  public dataadd:Photo[]=[];
  public dataupdate:Photo[]=[];

  constructor(public platform:Platform,public pindahtab: NavController,public route:ActivatedRoute,public firestorage: AngularFireStorage,public afs:AngularFirestore, public toastCtrl:ToastController) 
  {this.loadFoto(); 
  this.platform=platform;
}

  public getAllNotes () {
    return this.afs.collection<DetNot>("datanotes").snapshotChanges();
  }


  public async loadFoto() {

    this.getAllNotes().subscribe(res => {
      this.isinote = res;
      this.temptdata=[];
      res.forEach(element => {
        var t = (element.payload.doc.data() as DetNot); 
        this.temptdata.unshift(t);
        
      });
    });
  }

  public async simpanFoto(foto:CameraPhoto){

    const base64Data = await this.readAsBase64(foto);
    const namaFile =new Date().getTime()+'.jpeg';

    const simpanFile=await Filesystem.writeFile({
      path:namaFile,
      data:base64Data,
      directory:FilesystemDirectory.Data
    });

    const response = await fetch(foto.webPath);
    const blob = await response.blob();
    const dataFoto = new File ([blob],foto.path,{
      type:"image/jpeg" //ini file yg ga diconvert ke base 64 tpi bntuk file
    })

    if(this.platform.is('hybrid')){
      return{
        filePath:simpanFile.uri,
        webviewPath:Capacitor.convertFileSrc(simpanFile.uri),
        dataImage:dataFoto
      }

    }
    else{
    return{
      filePath:namaFile,
      webviewPath:foto.webPath,
      dataImage:dataFoto
    }
    }

  }

  private async readAsBase64(foto:CameraPhoto){
    if(this.platform.is('hybrid')){
      const file=await Filesystem.readFile({
        path:foto.path
      });
      return file.data;

    }
    else{
    const response = await fetch(foto.webPath);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
    }
  }


  convertBlobToBase64=(blob:Blob) => new Promise((resolve,reject)=>{
    const reader = new FileReader;
    reader.onerror=reject;
    reader.onload=() => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  public async tambahNote(foto,judulnote,isinote,tanggalnote,nilainote) {

    alert(this.dataFoto);

    // const listFoto=await Storage.get({key:this.keyfoto});
    // this.dataFoto=JSON.parse(listFoto.value)||[];

    const randomId   = Math.random().toString(36).substring(2, 8);
    const namaFile   = `datanotes/${new Date().getTime()}_${randomId}.jpeg`;
    
    const response    = await fetch(foto.webPath);  
    const blob        = await response.blob();
    const dataFoto    = new File([blob], foto.path, { type : "image/jpeg" });

    var   imageurl    = ""; 
    //After uploading the file
    await this.firestorage.upload(namaFile, dataFoto).then(rst => {
      rst.ref.getDownloadURL().then(url => {
        return new Promise<any>((resolve, reject) =>{
          const id = this.afs.createId();
            var data = {
              judulnote,
              isinote,
              tanggalnote, 
              nilainote,
              url
            };
            this.afs
                .collection("datanotes")
                .add(data)
                .then(res => {}, err => reject(err));
            console.log("Sukses Tambah Note"); 
            alert("Succes Tambah Note");
        });
      })
    })
    this.dataFoto=[];

  }

  public async updatedata(foto,judulnote,isinote,tanggalnote,nilainote,paramindex){
    // Set the "capital" field of the city 'DC'
    this.afs.collection("datanotes").doc()[paramindex].update({
      judulnote,
      isinote,
      tanggalnote,
      nilainote,
      // foto.filePath
      
    });
    this.dataupdate=[];

  }
}

export interface Photo{
    filePath:string; //namafile kyk img/namafile
    webviewPath:string; //url
    dataImage : File 
}


export interface DetNot{
  judulnote:string;
  isinote:string;
  tanggalnote:Date;
  nilainote:number;
  url:string;

}
