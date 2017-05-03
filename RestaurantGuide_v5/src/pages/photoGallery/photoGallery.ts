import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, NavParams } from 'ionic-angular';
import { RGapiServices } from '../../app/services/rgapi.services';
import { Camera, CameraOptions } from '@ionic-native/camera';

declare var cordova: any;



@Component({
  selector: 'page-photoGallery',
  templateUrl: 'photoGallery.html'
})
export class PhotoGalleryPage {
  place:any;
  photosInformations:any;
  imageURL:String;
  imageName:String;

  constructor(public navCtrl: NavController, public params:NavParams, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private rgService: RGapiServices, private camera:Camera) {
        this.place = params.get('place');
        this.photosInformations = params.get("photosInformations");
  }

  takePicture(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum:false
  }
  
    this.camera.getPicture(options).then((imageData) => {
    this.imageName = imageData;
    this.imageURL = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.presentToast("Greška!" + err);
    });
}

  presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
    });
    toast.present();
  }

  upload(){
    this.rgService.uploadImage(this.imageURL, this.imageName);
  }
  
  


}
