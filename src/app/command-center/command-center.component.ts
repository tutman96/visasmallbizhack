import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownModule, ChartModule } from 'primeng/primeng';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-command-center',
  templateUrl: './command-center.component.html',
  styleUrls: ['./command-center.component.css']
})
export class CommandCenterComponent implements OnInit {

  searchForm: FormGroup;

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  formData;
  selectedRadius = '10 mile radius';

  data: any;
  msgs = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.searchForm = this.fb.group({
      business: ['', Validators.required],
      zip: ['', Validators.required],
      radius: ['']
    });

    this.data = {
      labels: [
        'Average Transaction Frequencey',
        'Sales Transaction Count Growth MoM',
        'Sales Transaction Count Growth YoY',
        'Sales Volume Growth MoM',
        'Sales Volume Growth YoY',
        'Spend Outside Geography'
      ],
      datasets: [
          {
              label: 'First Dataset',
              data: [4.75, 7.4982, -5.9569, 7.2337, -31.7596, 24.94],
              fill: false,
              borderColor: '#4bc0c0'
          }
      ]
    };
   }

  ngOnInit() {
    this.api.getMeasurement('30044').subscribe( result => {
      console.log(result);
    });
  }

  changeRadius(radius: string) {
    this.selectedRadius = radius;
  }

}
