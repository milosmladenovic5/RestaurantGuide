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



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    PlaceInfoPage
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
    PlaceInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
