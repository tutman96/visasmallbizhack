import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class GmapsService {
  apikey: string = environment.gapikey;
  constructor(
    private http: HttpClient
  ) { }

  addKey = (query: string) => {
    return `https://maps.googleapis.com/maps/api${query}&key=${this.apikey}`;
  }

  getPlaces = () => {
    return this.http.get(this.addKey(`/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise`));
  }
}
