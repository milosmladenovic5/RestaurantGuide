//  let db = new SQLite();
//       db.create({
//         name: "data.db",
//         location: "default"
//       }).then(() => {
//         db.executeSql("CREATE TABLE IF NOT EXISTS favoritePlaces (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, LiveMusic TEXT, Latitude TEXT, Longitude TEXT, Latitude TEXT, Coucine TEXT, PlaceType TEXT, Address TEXT, PhoneNumber TEXT)",{}).then((data) => {
//          console.log("TABLE CREATED: ", data);
//         }, (error) => {
//           console.log("Error", error);
//         })
//      }, (error) =>{
//        console.log("Unable to open database.", error);
//      });
//     });

//ovaj gore kod ce da nam sluzi za kreiranje baze ili otvaranje postojece u slucaju da je kreirana

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent} from "@ionic-native/google-maps";
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { RGapiServices } from '../../app/services/rgapi.services';
import { MenuPage } from '../menu/menu';
import { ReviewListPage } from '../reviewList/reviewList';


@Component({
  templateUrl: 'placeInfo.html'
})
export class PlaceInfoPage {


  map:GoogleMap;
     
   place:any;
   constructor(public navCtrl: NavController, private platform:Platform, public params:NavParams, public geolocation:Geolocation, private googleMaps:GoogleMaps, private rgService: RGapiServices) {
    this.place = params.get('place');
  
     platform.ready().then(() => { 
        let location = new LatLng(this.place.Latitude, this.place.Longitude);
        this.loadMap(location);
        });
  }

  loadMap(location){ 
        //let location = new LatLng(-34.9290,138.6010);
 
        this.map = new GoogleMap('placeMap', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });

        this.map.setCenter(location);
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
 
    }

    viewMenu() {
        this.rgService.getPlaceMenu(this.place.PlaceId).subscribe(response => {
              this.navCtrl.push(MenuPage, {menuItems:response});   
        }) 
    }

    viewReviews() {
        this.rgService.getPlaceReviews(this.place.PlaceId).subscribe(response => {
              this.navCtrl.push(ReviewListPage, {reviews:response, place:this.place});   
        })
    }



}



