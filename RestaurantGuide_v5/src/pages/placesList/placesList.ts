import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { PlaceInfoPage } from '../placeInfo/placeInfo';

@Component({
  selector: 'placesList',
  templateUrl: 'placesList.html'
})
export class PlacesListPage {
  places:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
    this.places = params.get('places');
  }

  showPlaceDetails(place){
    this.navCtrl.push(PlaceInfoPage, {place:place});
  }

  showMapWithPlaces(){
    this.navCtrl.push(MapPage, {places:this.places});
  }

}
