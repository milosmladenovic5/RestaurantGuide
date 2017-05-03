import { Component } from '@angular/core';
import { NavController,  NavParams  } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'
import { Platform } from 'ionic-angular';
import { SqlStorage } from '../../providers/sql-storage';



@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {

favoritePlaces:any;
sqlDatabase:SQLite;

  constructor(public navCtrl: NavController, public sqlStorage:SqlStorage, private platform:Platform, private sqlite:SQLite, public params: NavParams,) {
    platform.ready().then(() =>{ 
      this.sqlStorage.getAllPlaces()
        .then(data => {
          this.favoritePlaces = data;
        });

    });
  }

  placeDetails(place)
  {
    console.log("Place details click.");
  }


}
