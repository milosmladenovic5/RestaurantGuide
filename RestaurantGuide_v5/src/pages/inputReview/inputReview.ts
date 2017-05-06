import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RGapiServices } from '../../app/services/rgapi.services';
import { ReviewListPage } from '../reviewList/reviewList';

@Component({
  selector: 'page-inputReview',
  templateUrl: 'inputReview.html'
})
export class InputReviewPage {

  review:any;
  place:any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private rgService: RGapiServices, public params:NavParams) {
    this.review = { };
    this.place = this.params.get("place");
    this.review.placeId = this.place.PlaceId;
    
  }

  submitReview(){
    if(!this.review.nickname || !this.review.comment)
    {
        let toast = this.toastCtrl.create({
          message: 'Neko od obaveznih polja je prazno!',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
    }
    else
    {
       this.rgService.submitReview(this.review).subscribe(response => {
         this.navCtrl.push(ReviewListPage, {reviews:response, place:this.place} ) // funkcija ubacuje novi i vraca sve 
        }); 
    }
  }

}
