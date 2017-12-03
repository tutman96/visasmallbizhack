import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapApiComponent } from './map-api.component';

describe('MapApiComponent', () => {
  let component: MapApiComponent;
  let fixture: ComponentFixture<MapApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
