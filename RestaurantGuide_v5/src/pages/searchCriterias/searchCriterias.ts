import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlacesListPage } from '../placesList/placesList';
import { RGapiServices } from '../../app/services/rgapi.services';

@Component({
  selector: 'page-searchCriterias',
  templateUrl: 'searchCriterias.html'

})
export class SearchCriteriasPage {

  distance:boolean;

  constructor(public navCtrl: NavController, private rgService: RGapiServices ,public params:NavParams) {
    this.distance = params.get('distance');
  } 

}