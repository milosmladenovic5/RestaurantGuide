import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RGapiServices{
    http:any;
    baseUrl : String;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = "http://192.168.1.106:8000/api/";
    }

    getCityByName(name){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = {cityName:'Nis'}; //name

        return this.http.post(this.baseUrl+'getCityByName', JSON.stringify(body), {headers:headers}).map(res => res.json());
    }

    getPlacesByDistance(distance,location){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = {distance:distance, location:location};
        //lokacija neka ostane fiksna(u uapiju za sada)

        return this.http.post(this.baseUrl+'getNearbyPlaces', JSON.stringify(body), {headers:headers}).map(res => res.json());
    }

    getPlacesByCriterias(liveMusic, coucine, type)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = {coucine:coucine, liveMusic:liveMusic, type:type};
      
        return this.http.post(this.baseUrl+'getPlacesByCriterias', JSON.stringify(body), {headers:headers}).map(res => res.json());
    }

    getPlaceByName(placeName)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = {placeName:placeName};

        return this.http.post(this.baseUrl+'getPlaceByName', JSON.stringify(body), {headers:headers}).map(res => res.json());
    }

    getPlaceMenu(placeId)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = {placeId:placeId};

        return this.http.post(this.baseUrl+'getPlaceMenu', JSON.stringify(body), {headers:headers}).map(res => res.json());
    }

    getPlaceReviews(placeId)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = {placeId:placeId};

        return this.http.post(this.baseUrl+'getPlaceReviews', JSON.stringify(body), {headers:headers}).map(res => res.json());
    }

    submitReview(review)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let body = {review:review};

        return this.http.post(this.baseUrl+'createComment', JSON.stringify(body), {headers:headers}).map(res => res.json());
    }


}