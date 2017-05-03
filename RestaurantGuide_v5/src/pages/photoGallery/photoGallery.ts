import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, NavParams } from 'ionic-angular';
import { RGapiServices } from '../../app/services/rgapi.services';

declare var cordova: any;

@Component({
  selector: 'page-photoGallery',
  templateUrl: 'photoGallery.html'
})
export class PhotoGalleryPage {
  place:any;
  photosInformations:any;
  lastImage: string = null;
  loading: Loading;

  constructor(public navCtrl: NavController, public params:NavParams, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController, private rgService: RGapiServices) {
        this.place = params.get('place');
        this.photosInformations = params.get("photosInformations");
  }




}
