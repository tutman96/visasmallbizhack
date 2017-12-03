import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
declare const google: any;

export interface Place {
  name: string,
  price_level: number,
  rating: number,
  geometry: any
}

export interface ZipInfo {
  zipResult: {
    geometry: any
  },
  placesResult: Array<Place>
}

@Injectable()
export class GmapsService {
  public zipInfo: ZipInfo;

  private apikey: string = environment.gapikey;
  private map: any;
  private service: any;

  constructor(
    private http: HttpClient
  ) { }

  addKey = (query: string) => {
    return `https://maps.googleapis.com/maps/api${query}&key=${this.apikey}`;
  }

  setMap = (map: any) => {
    this.map = map;
    this.service = new google.maps.places.PlacesService(this.map);
  }

  loadZipInfo = (zip: string, searchTerm: string): Observable<ZipInfo> => {
    const geocoder = new google.maps.Geocoder();
    return Observable.create((observer) => {
      geocoder.geocode({ address: zip }, (geocoderResult, status) => {
        this.service.nearbySearch({
          location: geocoderResult[0].geometry.location,
          radius: 2500,
          keyword: 'searchTerm',
          type: ['restaurant']
        }, (placesResult) => {
          this.zipInfo = {
            zipResult: geocoderResult[0],
            placesResult: placesResult
          }
          observer.next(this.zipInfo);
        });
      });
    });
  }

  getPlaces = () => {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDitlcYllb5lz5IHStWxVYjI0yQLQnrRYg');
  }
}