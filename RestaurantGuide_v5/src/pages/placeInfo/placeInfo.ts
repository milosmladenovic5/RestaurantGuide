//  let db = new SQLite();
//       db.create({
//         name: "data.db",
//         location: "default"
//       }).then(() => {
//         db.executeSql("CREATE TABLE IF NOT EXISTS favoritePlaces (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, LiveMusic TEXT, Latitude TEXT, Longitude TEXT, Latitude TEXT, Coucine TEXT, PlaceType TEXT, Address TEXT, PhoneNumber TEXT)",{}).then((data) => {
//          console.log("TABLE CREATED: ", data);
//         }, (error) => {
//           console.log("Error", error);
//         })
//      }, (error) =>{
//        console.log("Unable to open database.", error);
//      });
//     });

//ovaj gore kod ce da nam sluzi za kreiranje baze ili otvaranje postojece u slucaju da je kreirana

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'placeInfo.html'
})
export class PlaceInfoPage {

   place:any;
   constructor(public navCtrl: NavController, public params:NavParams) {
    this.place = params.get('place');
  }

}


