import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RGapiServices{
    http:any;
    baseUrl : String;

    constructor(http:Http){
        this.http = http;
        this.baseUrl = "http://192.168.56.1:8000/api/";
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
}