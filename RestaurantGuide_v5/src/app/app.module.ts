import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PlacesListPage } from '../pages/placesList/placesList';
import { HttpModule } from '@angular/http';
import { SearchCriteriasPage } from '../pages/searchCriterias/searchCriterias';
import { MapPage } from '../pages/map/map';
import { PlaceInfoPage } from '../pages/placeInfo/placeInfo';
import { GoogleMap, LatLng, GoogleMapsEvent , GoogleMaps} from "@ionic-native/google-maps";
import { Connectivity } from '../providers/connectivity';
import { Locations } from '../providers/locations';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuPage } from '../pages/menu/menu';
import { InputReviewPage } from '../pages/inputReview/inputReview';
import { ReviewListPage } from '../pages/ReviewList/ReviewList';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FavoritesPage,
    HomePage,
    TabsPage,
    PlacesListPage,
    SearchCriteriasPage,
    MapPage,
    PlaceInfoPage,
    MenuPage,
    InputReviewPage,
    ReviewListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FavoritesPage,
    HomePage,
    TabsPage,
    PlacesListPage,
    SearchCriteriasPage,
    MapPage,
    PlaceInfoPage,
    MenuPage,
    InputReviewPage,
    ReviewListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
