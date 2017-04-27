import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlacesListPage } from '../placesList/placesList';
import { RGapiServices } from '../../app/services/rgapi.services';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular'

@Component({
  selector: 'page-searchCriterias',
  templateUrl: 'searchCriterias.html'

})
export class SearchCriteriasPage {

  distance:boolean;
  maxDistance:any; // ngModel sa istim imenom (kada se on menja, menja se i ovaj atribut)
  location:any;

  constructor(public navCtrl: NavController, platform:Platform, private geolocation:Geolocation, private rgService: RGapiServices ,public params:NavParams) {
    this.distance = params.get('distance');
    this.maxDistance = 0;

    this.location = { longitude:0.0 , latitude:0.0 };
   
     platform.ready().then(() => {
 
     geolocation.getCurrentPosition().then((resp) => {
         this.location.latitude= resp.coords.latitude;
         this.location.longitude= resp.coords.longitude;
      });
     });
  } 

 getPlacesByDistance()
 {
    this.rgService.getPlacesByDistance(this.maxDistance, this.location).subscribe(response => {
        console.log(response); // ovde pristupiti plaginu za lokaciju
        this.navCtrl.push(PlacesListPage, {places:response});   // i preusmeriti na listu
    })
 }
}