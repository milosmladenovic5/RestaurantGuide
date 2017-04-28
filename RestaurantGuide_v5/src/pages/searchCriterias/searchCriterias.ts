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

  coucine:String;
  type:String;
  liveMusic:String;
  constructor(public navCtrl: NavController, platform:Platform, private geolocation:Geolocation, private rgService: RGapiServices ,public params:NavParams) {
    this.distance = params.get('distance');
    this.maxDistance = 0;
    this.coucine = "Balkanska";
    this.type = "Restoran";
    this.liveMusic = "No";

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
    //let loc = new LatLng(43.3180417,21.8960932);
    this.location = { longitude:21.8960922,latitude:43.3180417 }; // fiksno - genymotion location ne radi~

    this.rgService.getPlacesByDistance(this.maxDistance, this.location).subscribe(response => {
        console.log(response); // ovde pristupiti plaginu za lokaciju
        this.navCtrl.push(PlacesListPage, {places:response});   // i preusmeriti na listu
    })
 }

  getPlacesByCriterias()
 {
    this.rgService.getPlacesByCriterias(this.liveMusic, this.coucine, this.type).subscribe(response => {
        console.log(response); 
        this.navCtrl.push(PlacesListPage, {places:response});   
    })
 }
}