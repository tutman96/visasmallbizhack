import { Component, OnInit } from '@angular/core';
import { GmapsService } from '../services/gmaps.service';
@Component({
  selector: 'app-map-api',
  templateUrl: './map-api.component.html',
  styleUrls: ['./map-api.component.css']
})
export class MapApiComponent implements OnInit {

  constructor(
    private mapApi: GmapsService
  ) { }

  ngOnInit() {
    this.mapApi.getPlaces().subscribe((response: any) => {
      console.log(response);
    },
      (error) => {
        console.error(error);
      });
  }

}
