import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SqlStorage } from '../../providers/sql-storage';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-favoritePlacesInfo',
  templateUrl: 'favoritePlaceInfo.html'
})
export class FavoritePlaceInfoPage {
  place:any;
  menu:any;

  constructor(public navCtrl: NavController,private sqlStorage:SqlStorage, private caller:CallNumber,  public params:NavParams) {
        this.place = params.get('place');
  }


  callNumber(phoneNumber)
  {
      this.caller.callNumber(phoneNumber,true)
        .then(() => console.log("Successfull call."))
        .catch(() => console.log("Error launching dialer."));
  
  }

  viewMenu(placeName)
  {
      this.sqlStorage.getMenuForPlace(this.place.name)
        .then(data => {
              this.navCtrl.push(MenuPage, {menuItems:data});  
      });
  }
}
