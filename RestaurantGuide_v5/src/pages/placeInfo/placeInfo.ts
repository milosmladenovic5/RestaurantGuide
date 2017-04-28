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


@Component({
  templateUrl: 'placeInfo.html'
})
export class PlaceInfoPage {
  places:any;
  location:any;

  map:GoogleMap;
     
   place:any;
   constructor(public navCtrl: NavController, private platform:Platform, public params:NavParams, public geolocation:Geolocation, private googleMaps:GoogleMaps) {
    this.place = params.get('place');

     platform.ready().then(() => { 
        this.loadMap();
        });
  }

  loadMap(){ 
        let location = new LatLng(-34.9290,138.6010);
 
        this.map = new GoogleMap('map', {
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

        this.map.setCenter(this.location);
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
 
    }

}


