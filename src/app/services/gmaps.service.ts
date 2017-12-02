import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
declare const google: any;
@Injectable()
export class GmapsService {
  apikey: string = environment.gapikey;
  constructor(
    private http: HttpClient
  ) { }

  addKey = (query: string) => {
    return `https://maps.googleapis.com/maps/api${query}&key=${this.apikey}`;
  }

  getZipInfo = (zip: string) => {
    const geocoder = new google.maps.Geocoder();
    const source = Observable.create((observer) => {
      geocoder.geocode({'address': zip}, (results, status) => {
        observer.next(results[0]);
      });
    });
    return source;
  }

  getPlaces = () => {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDitlcYllb5lz5IHStWxVYjI0yQLQnrRYg');
  }
}