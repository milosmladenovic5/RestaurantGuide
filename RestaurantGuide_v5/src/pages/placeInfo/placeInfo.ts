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
import { PhotoGalleryPage } from '../photoGallery/photoGallery';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  templateUrl: 'placeInfo.html'
})
export class PlaceInfoPage {


  map:GoogleMap;
     
   place:any;
   constructor(public navCtrl: NavController, private dialogs:Dialogs, private caller: CallNumber,  public sqlStorage:SqlStorage,  private sqlite:SQLite, private platform:Platform, public params:NavParams, public geolocation:Geolocation, private googleMaps:GoogleMaps, private rgService: RGapiServices) {
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

    viewGallery(){
       this.rgService.getPhotosInformations(this.place.PlaceId).subscribe(response => {
            this.navCtrl.push(PhotoGalleryPage,{place:this.place, photosInformations:response});
        }) 
      
    }

    viewReviews() {
        this.rgService.getPlaceReviews(this.place.PlaceId).subscribe(response => {
              this.navCtrl.push(ReviewListPage, {reviews:response, place:this.place});   
        })
    }

  
    addToFavorites(place)
    {
      this.rgService.getPlaceMenu(place.PlaceId).subscribe(response => {
       this.sqlStorage.insertFavoritePlace(place)
        .then(() =>{
            this.addMenuToFavorites(response, this.place.Name);
            this.dialogs.alert('Dodato u omiljene.','Obaveštenje','Izađi')
            .then(() => console.log('Dialog dismissed'))
            .catch(e => console.log('Error displaying dialog', e));
        });
      }) 
       
    }

    addMenuToFavorites(menu, placeName)
    {
      for(var i=0; i<menu.length; i++)
      {
        menu[i].PlaceName = placeName;
        this.sqlStorage.insertMenuItem(menu[i])
          .then(() => {
            console.log("Menu item added.");
          });
      }      
    }

    
    callNumber(phoneNumber)
    {
        this.caller.callNumber(phoneNumber,true)
        .then(() => console.log("Successfull call."))
        .catch(() => console.log("Error launching dialer."));
    }


}



