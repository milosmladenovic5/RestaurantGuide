import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { RGapiServices } from '../../app/services/rgapi.services';
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, MarkerOptions, Marker} from "@ionic-native/google-maps";
import { PlaceInfoPage } from '../placeInfo/placeInfo';

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})

export class MapPage {
  places:any;
  //location:any;

  map:GoogleMap;
     

  constructor(public navCtrl: NavController, private rgService: RGapiServices, public params:NavParams, platform:Platform,public geolocation:Geolocation, private googleMaps:GoogleMaps)
  {      
     platform.ready().then(() => {         
        //geolocation.getCurrentPosition().then((resp) => {
            // this.location.latitude= resp.coords.latitude;
            // this.location.longitude= resp.coords.longitude;
            //let location = new LatLng(resp.coords.latitude,resp.coords.longitude );
            let location = new LatLng(43.3180417,21.8960932);
            this.loadMap(location);

          //});
        });

      this.places = params.get('places');
  }


  //  ngAfterViewInit() {
  //           this.loadMap();
  //  }
          

   loadMap(location){ 
      
        console.log("Platforma je spremna, ulazim u smrdljivu funkciju!")
 
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

        this.map.setCenter(location);
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
            for(let place of this.places)
            {
              let markerOptions: MarkerOptions = {
                    position: new LatLng(place.Latitude, place.Longitude),
                    title: place.Name
                  };

                this.map.addMarker(markerOptions)
                      .then((marker: Marker) => {
                          marker.showInfoWindow();
                          marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => 
                          {
                             this.markerClick(marker.getTitle());
                          });
                });
            }
             
        });      
        
 
    }

    markerClick(placeName)
    {
       console.log('Marker clicked...' + placeName);
             
        this.rgService.getPlaceByName(placeName).subscribe(response => {
              console.log(response); 
              this.navCtrl.push(PlaceInfoPage, {place:response});   // i preusmeriti na na samo mesto
        })                    
    }

  
}

