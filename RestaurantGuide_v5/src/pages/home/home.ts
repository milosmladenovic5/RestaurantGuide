import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlacesListPage } from '../placesList/placesList';
import { RGapiServices } from '../../app/services/rgapi.services';
import { SearchCriteriasPage } from '../searchCriterias/searchCriterias';
import { Platform } from 'ionic-angular';
import {IonicPage, NavParams} from "ionic-angular";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  platform: any;  

  constructor(public navCtrl: NavController, private rgService: RGapiServices, platform: Platform, public navParams:NavParams) {
    this.platform = platform;
      this.platform.ready().then(() =>{ 
        this.drawLogo();
      });
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

 
  drawLogo(){
      var canvas = <HTMLCanvasElement>document.getElementById('logo');
      var ctx = canvas.getContext('2d');

        ctx.strokeStyle = '#387ef5';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'miter';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(10, 180);
        ctx.lineTo(10, 0);
        ctx.lineTo(180, 0);
        ctx.lineTo(180,180);
        ctx.lineTo(10,180);
        ctx.stroke();

        // ctx.fillStyle = '#387ef5';
        // ctx.lineJoin = 'miter';
        // ctx.beginPath();
        // ctx.moveTo(125, 90);
        // ctx.lineTo(100, 70);
        // ctx.lineTo(90, 90);
        // ctx.lineTo(80, 80);
        // ctx.lineTo(55, 90);
        // ctx.lineTo(90, 20);
        // ctx.stroke();
        // ctx.fill();
    }


}
