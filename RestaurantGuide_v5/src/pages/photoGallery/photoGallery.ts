import { NavController , NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-photoGallery',
  templateUrl: 'photoGallery.html'
})
export class PhotoGalleryPage {
  placeName:any;
  place:any;

  constructor(public navCtrl: NavController, public params:NavParams) {
        this.placeName = params.get('placeName');
  }

}
