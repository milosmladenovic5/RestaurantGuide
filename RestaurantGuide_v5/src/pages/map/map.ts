import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

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
        });
     });
    
     this.places = params.get('places');
  }

  ionViewDidLoad(){
      this.loadMap();
  }

  loadMap(){
    
    this.geolocation.getCurrentPosition().then((position)=>{

        let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
            center: latlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
        console.log(err);
    });  
  }

  addMarker(){

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
        
        let content = "<h4>Information!</h4>";          
        
        this.addInfoWindow(marker, content);
 
    }

    addInfoWindow(marker, content){
        
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });
        
        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }




}
