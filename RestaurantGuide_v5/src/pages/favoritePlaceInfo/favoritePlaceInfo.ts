import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';

@Component({
  selector: 'page-favoritePlacesInfo',
  templateUrl: 'favoritePlaceInfo.html'
})
export class FavoritePlaceInfoPage {
  place:any;

  constructor(public navCtrl: NavController, public params:NavParams) {
        this.place = params.get('place');
  }

}
