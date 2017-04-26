import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlacesListPage } from '../placesList/placesList';
import { RGapiServices } from '../../app/services/rgapi.services';
import { SearchCriteriasPage } from '../searchCriterias/searchCriterias';
import { Platform } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  platform: any;

  constructor(public navCtrl: NavController, private rgService: RGapiServices, platform: Platform) {
    this.platform = platform;
  } 
  
  getNearbyPlaces()
  {
    this.rgService.getCityByName('Nis').subscribe(response => {
      this.navCtrl.push(PlacesListPage, {item:response}) });
  }

  showSearchCriteriasPage(distance)
  {
    this.navCtrl.push(SearchCriteriasPage, {distance:distance});
  }

  exitApp(){
    this.platform.exitApp();
  }


}
