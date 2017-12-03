import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GmapsService, Place } from '../services/gmaps.service';
import { ApiService } from '../services/api.service';
import _ from 'lodash';

declare const google: any;
@Component({
  selector: 'app-map-api',
  templateUrl: './map-api.component.html',
  styleUrls: ['./map-api.component.scss']
})
export class MapApiComponent implements OnInit {
  searchForm: FormGroup;
  map: any;
  heatmap: any;
  openInfoWindow: any;
  visaData: any = null;
  salesYoY: boolean = true;
  transYoY: boolean = true;
  showDash: boolean = false;
  chartData: any;
  chartOptions: any;
  averageRating: any = 10;
  test: any = 'test';

  // dash stuff
  loanForm: FormGroup;
  formData;
  allMMData = {};
  isYoy = true;
  isMom = false;
  finished = false;
  finishedWalk = false;
  walkGrade: string;
  data = {
    labels: [
      'Sales Volume Growth YoY',
      'Sales Transaction Count Growth YoY',
      'Spend Outside Geography',
      'Average Transaction Frequencey'
    ],
    datasets: [
        {
            label: '',
            data: [],
            fill: false,
            borderColor: '#4bc0c0'
        }
    ]
  };
  options = {
    title: {
        display: false,
        text: 'My Title',
        fontSize: 16
    },
    legend: {
        display: false
    }
  };
  walk = {
    labels: [],
    datasets: [
        {
            data: [],
            backgroundColor: [
                "#70D56F"
            ],
            hoverBackgroundColor: [
                "#70D56F"
            ]
        }]
  };

  constructor(
    private changeRef: ChangeDetectorRef,
    private mapApi: GmapsService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      business: ['', Validators.required],
      zip: ['', Validators.required],
      radius: ['']
    });

    this.route.queryParams.subscribe((data) => {
      console.log(data);
      if (data.zip && data.business) {
        this.getData(data.zip, data.business);
        this.getVisaData(data.zip);
        this.searchForm.patchValue(data);
      }
      else {
        this.getData('30307', 'Sushi');
        this.getVisaData('30307');
        // this.searchForm.patchValue(data);
        // if (data.zip && data.business) {
        //   this.getData(data.zip, data.business);
        //   this.getVisaData(data.zip);
        //   this.searchForm.patchValue(data);
        // }
        // else {
        //  this.router.navigate(['/']);
        // }
      }
    });
  }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('googleMap'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        // {
        //   featureType: 'poi.business',
        //   stylers: [{ visibility: 'off' }]
        // },
        // {
        //   featureType: 'transit',
        //   elementType: 'labels.icon',
        //   stylers: [{ visibility: 'off' }]
        // },
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
    });
    this.mapApi.setMap(this.map);

  }

  submitSearch = () => {
    if (this.searchForm.valid) {
      this.getData(this.searchForm.value.zip, this.searchForm.value.business);
    }
  }

  getData = (zip: string, term: string) => {
    this.mapApi.loadZipcodeGeometry(zip).subscribe((zipGeometry) => {
      this.map.setCenter(zipGeometry.location);
      this.map.fitBounds(zipGeometry.bounds);

      this.mapApi.loadPlaces('chinese').subscribe((places) => {
        this.getPlaceData();
        this.setMarkers(places);
        this.heatMap(places);
      });
    });
  }

  setMarkers = (results: Place[]) => {
    results.forEach((place) => {
      var marker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        title: place.name,
        icon: {
          url: '/assets/pin.svg',
          anchor: new google.maps.Point(15, 15)
        }
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
    if (this.heatmap) this.heatmap.setMap(null);
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

  getVisaData = (zip: string) => {
    this.apiService.getMeasurement(zip).subscribe((response) => {
      this.visaData = response;
      this.prepPieChart(this.visaData.spendOutsideGeography);
    });
  }

  toggleSales = (value: boolean) => {
    this.salesYoY = value;
  }

  toggleTrans = (value: boolean) => {
    this.transYoY = value;
  }

  getPlaceData = () => {
    this.test = this.mapApi.getTopPlaces(4);
    this.changeRef.detectChanges();
  }

  prepPieChart = (outpercent: number) => {
    const inpercent = 100 - outpercent;
    this.chartData = {
      labels: ['Out', 'In'],
      datasets: [
        {
          data: [outpercent, inpercent],
          backgroundColor: [
            '#192161',
            '#65cf64'
          ]
        }]
    };


    this.chartOptions = {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10
        }
      }
    };
  }


  toggleDash = () => {
    this.showDash = !this.showDash;
  }


}



