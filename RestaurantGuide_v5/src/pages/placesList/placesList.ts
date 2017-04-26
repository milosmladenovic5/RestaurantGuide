import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'placesList',
  templateUrl: 'placesList.html'
})
export class PlacesListPage {
  restaurants:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
    this.restaurants = params.get('restaurants');
  }

}
