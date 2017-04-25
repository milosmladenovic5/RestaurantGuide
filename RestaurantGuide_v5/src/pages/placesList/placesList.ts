import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'placesList',
  templateUrl: 'placesList.html'
})
export class PlacesListPage {
  item:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
    this.item = params.get('item');
  }

}
