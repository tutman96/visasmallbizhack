import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GmapsService, Place } from '../services/gmaps.service';
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
  openInfoWindow: any;
  
  constructor(
    private mapApi: GmapsService
  ) { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('googleMap'), { 
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
    this.mapApi.setMap(this.map);
    this.getData();
  }

  getData = () => {
    this.mapApi.loadZipcodeGeometry('30307').subscribe((zipGeometry) => {
      this.map.setCenter(zipGeometry.location);
      this.map.fitBounds(zipGeometry.bounds);
      
      this.mapApi.loadPlaces('chinese').subscribe((places) => {
        this.setMarkers(places);
        this.heatMap(places);
      })
    })
  }

  setMarkers = (results: Place[]) => {
    results.forEach((place) => {
      var marker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        title: place.name,
        icon: '/assets/pin.svg'
      });
      var infowindow = new google.maps.InfoWindow({
        content: `<div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="popupHeading">${place.name}</h1>
          <div id="bodyContent">
            ${place.rating != null ? `Rating: ${place.rating}/5<br>` : ""}
            ${(place.price_level != null ? "$".repeat(place.price_level) : "")}
          </div>
        </div>`
      });
      marker.addListener('click', () => {
        if (this.openInfoWindow) this.openInfoWindow.close();
        this.openInfoWindow = infowindow;
        infowindow.open(this.map, marker);
      });
    })
  }
  
  heatMap = (data: Place[]) => {
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: data.map((d) => d.geometry.location),
      opacity: 0.5,
      radius: 0.02,
      dissipating: false,
      map: this.map
    });
    
    var gradient = [
      "rgba(102, 255, 0, 0)",
      "rgba(102, 255, 0, 1)",
      "rgba(147, 255, 0, 1)",
      "rgba(193, 255, 0, 1)",
      "rgba(238, 255, 0, 1)",
      "rgba(244, 227, 0, 1)",
      "rgba(249, 198, 0, 1)",
      "#FFC200",
      "#FF7100" 
    ]
    this.heatmap.set('gradient', this.heatmap.get('gradient') ? null : gradient);
  }

  toggleHeat = () => {
    this.heatmap.setMap(this.heatmap.getMap() ? null : this.map);
  }
}



