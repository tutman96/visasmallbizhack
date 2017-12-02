import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GmapsService } from '../services/gmaps.service';
declare const google: any;
@Component({
  selector: 'app-map-api',
  templateUrl: './map-api.component.html',
  styleUrls: ['./map-api.component.css']
})
export class MapApiComponent implements OnInit {
  @ViewChild('map') mapel: ElementRef;
  map: any;
  heatmap: any;
  constructor(
    private mapApi: GmapsService
  ) { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('googleMap'), {mapTypeId: google.maps.MapTypeId.ROADMAP });
    this.getData();
  }

  getData = () => {
     const service = new google.maps.places.PlacesService(this.map);
    this.mapApi.getZipInfo('30307').subscribe(
      (response) => {
        this.map.setCenter(response.geometry.location);
        this.map.fitBounds(response.geometry.bounds);
        service.nearbySearch({
          location: response.geometry.location,
          radius: 2500,
          keyword: 'Chinese',
          type: ['establishment']
        }, (data) => {
          this.setMarkers(data);
          this.heatMap(data);
        });
      });
  }

  setupLayers = () => {
    this.map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.heatmap = new google.maps.visualization.HeatmapLayer({
      opacity: 0.2,
      radius: 1,
      dissipating: true,
      map: null
    });
  }

  setMarkers = (results: any[]) => {
    for (let i = 0; i < results.length; i++) {
      console.log(results[i]);
      this.createMarkers(results[i]);
    }
  }

  createMarkers = (place: any) => {
    const placeLoc = place.geometry.location;
    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location
    });
  }


  heatMap = (data: any[]) => {
    const heatmapData = [];
    for (let i = 0; i < data.length; i++) {
      heatmapData.push(data[i].geometry.location);
    }
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      opacity: 0.2,
      radius: 1,
      dissipating: false,
      map: this.map
    });
  }

  toggleHeat = () => {
    this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
  }
}



