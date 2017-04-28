import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent} from "@ionic-native/google-maps";

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})

export class MapPage {
  places:any;
  //location:any;

  map:GoogleMap;
     

  constructor(public navCtrl: NavController, public params:NavParams, platform:Platform,public geolocation:Geolocation, private googleMaps:GoogleMaps)
  {      
     //this.location = { longitude:0.0 , latitude:0.0 };

     platform.ready().then(() => {         
        geolocation.getCurrentPosition().then((resp) => {
            // this.location.latitude= resp.coords.latitude;
            // this.location.longitude= resp.coords.longitude;
            let location = new LatLng(resp.coords.latitude,resp.coords.longitude );
            this.loadMap(location);

          });
        });

      this.places = params.get('places');
  }


  //  ngAfterViewInit() {
  //           this.loadMap();
  //  }
          

   loadMap(location){ 
       // let location = new LatLng(-34.9290,138.6010);
 
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
        });
 
    }
      // create a new map by passing HTMLElement
  //     let element: HTMLElement = document.getElementById('map');

  //     let map: GoogleMap = this.googleMaps.create(element);

  //     // listen to MAP_READY event
  //     // You must wait for this event to fire before adding something to the map or modifying it in anyway
  //     map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

  //     // create LatLng object
  //     let ionic: LatLng = new LatLng(43.0741904,-89.3809802);

  //     // create CameraPosition
  //     let position: CameraPosition = {
  //       target: ionic,  
  //       zoom: 18,
  //       tilt: 30
  //     };

  //     // move the map's camera to position
  //     map.moveCamera(position);

  //     // create new marker
  //     let markerOptions: MarkerOptions = {
  //       position: ionic,
  //       title: 'Ionic'
  //     };

  //     // const marker: Marker = map.addMarker(markerOptions)
  //     //   .then((marker: Marker) => {
  //     //       marker.showInfoWindow();
  //     //     });
  //  }
}

