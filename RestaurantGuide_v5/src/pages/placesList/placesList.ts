import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'placesList',
  templateUrl: 'placesList.html'
})
export class PlacesListPage {
  places:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
    this.places = params.get('places');
  }

}
