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

@Injectable()
export class GmapsService {
  public zipcodeGeometry: any;
  public zipcodeName: string;

  public placesInfo: Array<Place>;

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

  loadZipcodeGeometry = (zip: string): Observable<any> => {
    const geocoder = new google.maps.Geocoder();
    return Observable.create((observer) => {
      geocoder.geocode({ address: zip }, (geocoderResult, status) => {
        this.zipcodeGeometry = geocoderResult[0].geometry;
        this.zipcodeName = geocoderResult[0].formatted_address;
        observer.next(this.zipcodeGeometry);
      });
    });
  }

  loadPlaces = (searchTerm: string): Observable<Array<Place>> => {
    return Observable.create((observer) => {
      if (this.zipcodeGeometry == null) throw new Error("zipcodeGeometry is null. call loadZipcodeGeometry");
      if (this.map == null) throw new Error("map is null. call setMap");
      this.placesInfo = [];
      console.log("searchTerm", searchTerm);
      this.service.nearbySearch({
        location: this.zipcodeGeometry.location,
        radius: 2500,
        keyword: searchTerm,
        type: ['restaurant']
      }, (results, status, pagination) => {
        this.placesInfo = this.placesInfo.concat(results)
        if (pagination.hasNextPage && this.placesInfo.length < 40) {
          console.log("new page", this.placesInfo);
          pagination.nextPage();
        }
        else {
          console.log("done", this.placesInfo);
          observer.next(this.placesInfo);
        }
      });
    })
  }

  getTopPlaces(num: number = 3): { total: number, places: Array<Place>, averageRating: any } {
    if (this.placesInfo == null) throw new Error("placesInfo is null. call loadPlaces");
    const avg = this.placesInfo.reduce((total, place) => place.rating != null ? total + place.rating : total, 0) / this.placesInfo.length
    return {
      total: this.placesInfo.length,
      places: this.placesInfo.slice(0, num),
      averageRating: avg.toFixed(2)
    }
  }
}