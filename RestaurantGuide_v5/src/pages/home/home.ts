import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlacesListPage } from '../placesList/placesList';
import { RGapiServices } from '../../app/services/rgapi.services';
import { SearchCriteriasPage } from '../searchCriterias/searchCriterias';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {

  platform: any;  

  constructor(public navCtrl: NavController, private rgService: RGapiServices, platform: Platform) {
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

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'miter';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(45, 45);
        ctx.lineTo(75, 135);
        ctx.lineTo(105, 45 );
        ctx.lineTo(135, 90);
        ctx.lineTo(90,90);
        ctx.lineTo(130,135);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(180,0);
        ctx.lineTo(180,180);
        ctx.lineTo(0,180);
        ctx.lineTo(0,0);
        ctx.stroke();

        ctx.font = "21px  Times New Roman";
       // ctx.fillText("vodič kroz restorane", 4, 167, 175); 
    }
}
