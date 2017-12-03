import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GmapsService } from '../services/gmaps.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
declare const google: any;
@Component({
  selector: 'app-map-api',
  templateUrl: './new-map.component.html',
  styleUrls: ['./new-map.component.css']
})
export class NewMapComponent implements OnInit {
  @ViewChild('map') mapel: ElementRef;
  searchForm: FormGroup;
  map: any;
  heatmap: any;
  visaData: any = null;
  constructor(
    private mapApi: GmapsService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      business: ['', Validators.required],
      zip: ['', Validators.required],
      radius: ['']
    });
   }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('googleMap'), {mapTypeId: google.maps.MapTypeId.ROADMAP });
    this.getData();
    this.getVisaData();
  }

  getData = () => {
     const service = new google.maps.places.PlacesService(this.map);
    // this.mapApi.getZipInfo('30307').subscribe(
    //   (response) => {
    //     this.map.setCenter(response.geometry.location);
    //     this.map.fitBounds(response.geometry.bounds);
    //     service.nearbySearch({
    //       location: response.geometry.location,
    //       radius: 2500,
    //       keyword: 'Chinese',
    //       type: ['establishment']
    //     }, (data) => {
    //       this.setMarkers(data);
    //       this.heatMap(data);
    //     });
    //   });
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

  getVisaData = () => {
    this.apiService.getMeasurement('30307').subscribe((response) => {
      this.visaData = response;
    });
  }
}



