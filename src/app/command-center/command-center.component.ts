import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownModule, ChartModule } from 'primeng/primeng';

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
  ) {
    this.searchForm = this.fb.group({
      business: ['', Validators.required],
      zip: ['', Validators.required],
      radius: ['']
    });

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#4bc0c0'
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              borderColor: '#565656'
          }
      ]
  }
   }

  ngOnInit() {
  }

  changeRadius(radius: string) {
    this.selectedRadius = radius;
  }

}
