import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isForm = false;
  searchForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute
    ) {
    this.searchForm = this.fb.group({
      business: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(value) {
    console.log(value);
  }

  onKey(event: any) { // without type info
    console.log(event);
  }

}
