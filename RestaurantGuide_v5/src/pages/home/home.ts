import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlacesListPage } from '../placesList/placesList';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  } 
  
  getNearbyPlaces()
  {
    this.navCtrl.push(PlacesListPage, {item:'pacsle'});
  }



}
