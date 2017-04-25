import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RGapiServices{
    http:any;
    baseUrl : String;

    constructor(http:Http){
        this.http  = http;
        this.baseUrl = "http://192.168.0.27:8000/api/";
    }

    getNearbyRestaurants(distance){
        return this.http.post()
    }


}