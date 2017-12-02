import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(
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
  }

  changeRadius(radius: string) {
    this.selectedRadius = radius;
  }

}
