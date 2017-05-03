import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RGapiServices } from './services/rgapi.services'
import { TabsPage } from '../pages/tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';
import { SQLite } from '@ionic-native/sqlite';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { SqlStorage } from '../providers/sql-storage';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  templateUrl: 'app.html',
  providers: [RGapiServices, Geolocation, SQLite, SqlStorage, CallNumber]
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
     
  });
}
}
