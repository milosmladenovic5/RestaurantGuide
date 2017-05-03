import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PhotoGalleryPage } from '../pages/photoGallery/photoGallery';
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
import { ReviewListPage } from '../pages/reviewList/reviewList';
import { Ionic2RatingModule } from 'ionic2-rating';
import { SQLite } from '@ionic-native/sqlite';
import { SqlStorage } from '../providers/sql-storage';


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
    ReviewListPage,
    PhotoGalleryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule
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
    ReviewListPage,
    PhotoGalleryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    SQLite,
    SqlStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
