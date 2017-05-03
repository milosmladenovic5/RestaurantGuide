import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InputReviewPage } from '../inputReview/inputReview';

@Component({
  selector: 'page-reviewList',
  templateUrl: 'reviewList.html'
})
export class ReviewListPage {

  reviews:any;
  place:any;
  constructor(public navCtrl: NavController, public params:NavParams) {
  this.reviews = params.get("reviews");
  this.place = params.get("place");
  }

  createNew()
  {
    this.navCtrl.push(InputReviewPage, {place:this.place});  
  }
}
