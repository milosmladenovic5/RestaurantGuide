import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, NavParams } from 'ionic-angular';
import { RGapiServices } from '../../app/services/rgapi.services';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Http } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Instagram } from '@ionic-native/instagram';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-photoGallery',
  templateUrl: 'photoGallery.html'
})

export class PhotoGalleryPage {

  place:any;
  photosInformations:any;
  imageURL:string;
  imageName:String;
  baseUrl:String;
  loading:Loading;
  index:number;

  constructor(public navCtrl: NavController, private instagram:Instagram, private socialSharing:SocialSharing, private transfer: Transfer, public http:Http, public params:NavParams, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private rgService: RGapiServices, private camera:Camera) {
        this.place = params.get('place');
        this.photosInformations = params.get("photosInformations");
        this.baseUrl = "http://192.168.0.10:8000/"
        this.index=0;
  }

  takePicture(type)
  {
      const options: CameraOptions = {
        quality: 20,
        sourceType:type,
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

  presentToast(text)
  {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
      });
      toast.present();
  }

  upload(){
    if(!this.imageURL)
      this.presentToast("Niste napravili fotografiju!");
    else
      this.uploadImage(this.imageURL, this.imageName, this.place.PlaceId);
  }


  uploadImage(imageURL, imageName, placeId) {
        const fileTransfer: TransferObject = this.transfer.create();

        let options: FileUploadOptions = {
            fileKey: 'pic',
            fileName: imageName,
            headers: {},
            params: { placeId:placeId }
        }

        this.loading = this.loadingCtrl.create({
          content: 'Slanje u toku...',
        });
        this.loading.present();

       fileTransfer.upload(imageURL, this.baseUrl + "api/"+"imageUpload", options)
        .then((data) => {
          this.loading.dismissAll();
          this.presentToast("Uspešno dodata fotografija.");
          this.rgService.getPhotosInformations(this.place.PlaceId).subscribe(response => {
            this.photosInformations = response;
            this.index = 0;
          })
        }, (err) => {
          this.loading.dismissAll();
          this.presentToast("Greška u slanju.");  
        })
    }

    nextImage(){
      console.log("array length is:" + this.photosInformations.length + "index is:" + this.index);
      this.index++;
      if(this.index==this.photosInformations.length)
      {
        this.index=0;
      }
    }

    previousImage(){
      console.log("array length is:" + this.photosInformations.length + "index is:" + this.index);
      this.index--;
      if(this.index<0){
        this.index=this.photosInformations.length-1;
      }
    }

    socialNetworkShare(network)
    {
      if(network == "instagram"){
        // this.instagram.share(this.imageURL, 'Caption')
        // .then(() => console.log('Shared!')).catch((error: any) => console.error(error));
        this.socialSharing.shareViaInstagram("caption",this.imageURL).then(() => console.log("OK")).catch(error => console.error(error));
      }
      else if(network =="facebook")
      {
        this.socialSharing.shareViaFacebook('Message via facebook.', null,null)
          .then(() => console.log('Successfully shared.'))
          .catch((error:any) => console.error(error));
      }
      else {
         this.socialSharing.shareViaTwitter('',this.imageURL).then(() => console.log('Successfully shared.')).catch((error:any) => console.error(error));
      }
    }

}
