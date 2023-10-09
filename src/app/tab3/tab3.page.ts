import { Component, OnInit } from '@angular/core';
import { SismosService } from 'src/app/services/sismos.service';

interface Earthquake {
  properties: {
    place: string;
    mag: number;
    time: number;
  };
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  earthquakes: any;
  filteredEarthquakes: Earthquake[] = [];
  searchTerm: string = '';

  constructor(private earthquakeService: SismosService) { }

  ngOnInit(): void {
    this.earthquakeService.getEarthquakes().subscribe(data => {
      this.earthquakes = data || {};
      this.filteredEarthquakes = this.earthquakes.features || [];
    });
  }

  filterEarthquakes() {
    this.filteredEarthquakes = this.earthquakes.features
      .filter((earthquake: Earthquake) => {
        const magnitude = earthquake.properties?.mag;

        return magnitude && magnitude.toString().includes(this.searchTerm);
      })
      .slice(0, 5); // Mostrar solo los primeros 5 resultados
  }
}
