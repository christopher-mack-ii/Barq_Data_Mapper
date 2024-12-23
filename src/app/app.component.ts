import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsModule, MapInfoWindow} from '@angular/google-maps';
import {HttpClientModule} from '@angular/common/http';
import {BarqMapResultsComponent} from './barq-map-results/barq-map-results.component';

@Component({
  selector: 'app-root',
  imports: [GoogleMapsModule, HttpClientModule, BarqMapResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  constructor() {}
}
