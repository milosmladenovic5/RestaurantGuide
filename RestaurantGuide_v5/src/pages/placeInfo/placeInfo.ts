import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, MarkerOptions, Marker} from "@ionic-native/google-maps";
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { RGapiServices } from '../../app/services/rgapi.services';
import { MenuPage } from '../menu/menu';
import { ReviewListPage } from '../reviewList/reviewList';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqlStorage } from '../../providers/sql-storage';
import { CallNumber } from '@ionic-native/call-number';


@Component({
  templateUrl: 'placeInfo.html'
})
export class PlaceInfoPage {


  map:GoogleMap;
     
   place:any;
   constructor(public navCtrl: NavController, private caller: CallNumber,  public sqlStorage:SqlStorage, private sqlite:SQLite, private platform:Platform, public params:NavParams, public geolocation:Geolocation, private googleMaps:GoogleMaps, private rgService: RGapiServices) {
    this.place = params.get('place');
  
     platform.ready().then(() => { 
        let location = new LatLng(this.place.Latitude, this.place.Longitude);
        this.loadMap(location);
        //this.createOrOpenDatabase();
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
            let markerOptions: MarkerOptions = {
                    position: new LatLng(this.place.Latitude, this.place.Longitude),
                    title: this.place.Name
                };

            this.map.addMarker(markerOptions)
                .then((marker:Marker) => {
                  console.log("Marker added.");
                  marker.showInfoWindow();
                });            
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

    createOrOpenDatabase()
    {
      this.sqlite.create({
        name:'data.db',
        location: 'default'
      }).then((db:SQLiteObject) => 
      {
          db.executeSql('create table FavoritePlaces (name VARCHAR(32), latitude REAL(20), longitude REAL(20), score REAL(2), liveMusic VARCHAR(3), placeType VARCHAR(10), cuisine VARCHAR(15), phoneNumber VARCHAR(20), address VARCHAR (45))',{})
          .then(() => {
            console.log("Local database created.");
          })
          .catch( e => console.log(e));
      });
    }

    addToFavorites(place)
    {
      this.sqlStorage.insertFavoritePlace(place)
      .then(() =>
        console.log("Successfull insertion."));
    }
    
    callNumber(phoneNumber)
    {
        this.caller.callNumber(phoneNumber,true)
        .then(() => console.log("Successfull call."))
        .catch(() => console.log("Error launching dialer."));
    }


}



