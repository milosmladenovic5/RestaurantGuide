import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  menuItems:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
  this.menuItems = params.get("menuItems");
  }

}
