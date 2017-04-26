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
  maxDistance:any; // ngModel sa istim imenom (kada se on menja, menja se i ovaj atribut)

  constructor(public navCtrl: NavController, private rgService: RGapiServices ,public params:NavParams) {
    this.distance = params.get('distance');
    this.maxDistance = 0;
  } 

 getPlacesByDistance()
 {
    this.rgService.getPlacesByDistance(this.maxDistance).subscribe(response => {
        console.log(response); // ovde pristupiti plaginu za lokaciju
                               // i preusmeriti na listu
    })
 }
}