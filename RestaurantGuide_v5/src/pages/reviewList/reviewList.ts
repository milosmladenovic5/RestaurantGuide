import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-reviewList',
  templateUrl: 'reviewList.html'
})
export class ReviewListPage {

  reviews:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
  this.reviews = params.get("reviews");
  }

}
