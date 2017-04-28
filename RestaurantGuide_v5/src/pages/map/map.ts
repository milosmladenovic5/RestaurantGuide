import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  places:any;
  location:any;
  @ViewChild('map') mapElement:ElementRef;
  map:any;

  constructor(public navCtrl: NavController, public params:NavParams, platform:Platform,public geolocation:Geolocation)
  {      
     this.location = { longitude:0.0 , latitude:0.0 };
   
     platform.ready().then(() => { 
        geolocation.getCurrentPosition().then((resp) => {
            this.location.latitude= resp.coords.latitude;
            this.location.longitude= resp.coords.longitude;
            this.loadMap();
        });
     });
    
     this.places = params.get('places');
  }

  ionViewDidLoad(){
      this.loadMap();
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
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
 
    }
}
