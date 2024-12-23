import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GoogleMap, MapHeatmapLayer} from '@angular/google-maps';
import {AppModule} from '../app.module';
import {firstValueFrom} from 'rxjs';
import HeatmapLayerOptions = google.maps.visualization.HeatmapLayerOptions;
import WeightedLocation = google.maps.visualization.WeightedLocation;
import LatLng = google.maps.LatLng;
import MapOptions = google.maps.MapOptions;

@Component({
  selector: 'app-barq-map-results',
  imports: [
    AppModule,
    GoogleMap,
    MapHeatmapLayer
  ],
  templateUrl: './barq-map-results.component.html',
  styleUrl: './barq-map-results.component.css'
})
export class BarqMapResultsComponent implements OnInit {
  heatMapOptions: HeatmapLayerOptions = {};
  options: MapOptions = {
    mapId: "7c3e44c09ddcb73a",
    center: {lat: 38.7946, lng: -96.5348},
    zoom: 5,
  };

  constructor(private httpClient: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    const usCitiesCsv: string = await firstValueFrom(this.httpClient.get("assets/us_cities.csv", {responseType: "text"}));
    const usCitiesMap: Map<string, LatLng> = new Map(usCitiesCsv?.split("\n").slice(1).map(
      row => {
        const cell: string[] = row.split(',');
        return [
          this.getCityState(cell[0], cell[1]),
          new LatLng({
            lat: Number(cell[2]),
            lng: Number(cell[3])
          })
        ]
      }
    ));
    const dataResultsCsv: string = await firstValueFrom(this.httpClient.get("assets/data_results.csv", {responseType: "text"}));
    const heatMapData: WeightedLocation[] = dataResultsCsv.split("\n").slice(1).map(
      line => {
        const cell: string[] = line.split(",");
        const latLng: LatLng = usCitiesMap.get(this.getCityState(cell[0], cell[1])) ?? new LatLng({lat: 0, lng: 0});
        return {
          location: latLng,
          weight: Number(cell[2]) / Number(cell[3])
        };
      }
    );
    this.heatMapOptions = {
      dissipating: false,
      data: heatMapData,
      radius: 1.5,
      opacity: 0.8
    }
  }

  private getCityState(city: string, state: string) {
    return city + ", " + state;
  }
}
