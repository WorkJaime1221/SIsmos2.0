import { Component } from '@angular/core';
import { SismosService } from '../services/sismos.service';

interface Earthquake {
  properties: {
    place: string;
  };
}


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  earthquakes: any;
  filteredEarthquakes: any[] = [] ; 
  searchTerm: string = '';

  constructor(private earthquakeService: SismosService) { }

  ngOnInit(): void {
    this.earthquakeService.getEarthquakes().subscribe(data => {
      this.earthquakes = data;
      this.filteredEarthquakes = this.earthquakes.features; // Inicialmente, muestra todos los terremotos
    });
  }
  filterEarthquakes() {
    this.filteredEarthquakes = this.earthquakes.features
      .filter((earthquake: Earthquake) => {
        const place = earthquake.properties?.place;
        return place && place.toLowerCase().includes(this.searchTerm.toLowerCase());
      })
      .slice(0, 5); // Mostrar solo los primeros 5 resultados
  }
}
