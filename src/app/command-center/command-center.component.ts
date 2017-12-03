import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownModule, ChartModule } from 'primeng/primeng';
import { ApiService } from '../services/api.service';
import { GmapsService, Place } from '../services/gmaps.service';

import _ from 'lodash';

@Component({
  selector: 'app-command-center',
  templateUrl: './command-center.component.html',
  styleUrls: ['./command-center.component.css']
})
export class CommandCenterComponent implements OnInit {

  searchForm: FormGroup;
  loanForm: FormGroup;

  formData;

  labels: [
    'Sales Volume Growth MoM',
    'Sales Transaction Count Growth MoM',
    'Sales Volume Growth YoY',
    'Sales Transaction Count Growth YoY',
    'Spend Outside Geography',
    'Average Transaction Frequencey'
  ];

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
            fill: true,
            backgroundColor: '#ffffff',
        }
    ],
  };

  allMMData = {};
  isYoy = true;
  isMom = false;
  finished = false;
  finishedWalk = false;
  walkGrade: string;

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
    labels: ['Walkability'],
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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private gapi: GmapsService,
  ) {
    this.searchForm = this.fb.group({
      business: ['', Validators.required],
      zip: ['', Validators.required],
      radius: ['']
    });
    this.loanForm = this.fb.group({
      balance: ['', Validators.required],
      loanAmount: ['', Validators.required],
      term: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
   }

  ngOnInit() {
    // Merchant Measurement Bar Graph
    this.api.getMeasurement('30044').subscribe( result => {
      this.allMMData = result;
      this.setBatGraph();
    });

    // Walkability Pie
    this.api.getWalkability(33.749249, -84.387314).subscribe(data => {
      const rate = data.score;
      this.walk.datasets[0].data.push(rate);
      const total = 100 - rate;
      this.walk.datasets[0].data.push(total);
      this.finishedWalk = true;

      if ( rate <= 25 ) {
        this.walkGrade = 'Bad :(';
      }else if (rate >= 25 && rate <= 50) {
        this.walkGrade = 'Poor';
      }else if (rate >= 51 && rate <= 75) {
        this.walkGrade = 'Good';
      }else if(rate >= 75) {
        this.walkGrade = 'Great!';
      }
    });
  }

  setBatGraph() {
    if (this.isYoy) {
      _.forEach(this.allMMData, (value, label) => {
        const yoy = _.endsWith(label, 'YoY');
        const other = _.endsWith(label, 'y');
        if (yoy || other) {
          this.data.datasets[0].data.push(value);
        }
        this.finished = true;
      });
    }else if (this.isMom) {
      _.forEach(this.allMMData, (value, label) => {
        const yoy = _.endsWith(label, 'MoM');
        const other = _.endsWith(label, 'y');
        if (yoy || other) {
          this.data.datasets[0].data.push(value);
        }
        this.finished = true;
      });
    }
  }

  toggleBar(type: string) {
    if(type === 'yoy') {
      this.isYoy = true;
      this.isMom = false;
      this.setBatGraph();
    }else {
      this.isYoy = false;
      this.isMom = true;
      this.setBatGraph();
    }
  }

  onSubmitLoan(controls) {
    this.api.getDepositRates(controls.balance, controls.loanAmount, controls.term, controls.zipcode).subscribe(rate => {
      console.log(rate);
    });
  }

}
