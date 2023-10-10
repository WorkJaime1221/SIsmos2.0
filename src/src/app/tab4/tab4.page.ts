import { Component, OnInit } from '@angular/core';
import { SismosService } from 'src/app/services/sismos.service';

interface Earthquake {
  properties: {
    place: string;
    mag: number;
    time: number | undefined;
  };
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  earthquakes: Earthquake[] = [];
  filteredEarthquakes: Earthquake[] = [];

  constructor(private sismosService: SismosService) {}

  ngOnInit(): void {
    this.sismosService.getEarthquakes().subscribe((data: any) => {
      this.earthquakes = data.features || [];
      this.filteredEarthquakes = this.earthquakes.slice(0, 5); // Mostrar solo los primeros 5
    });
  }

  formatDate(timestamp: number | undefined): string {
    if (timestamp === undefined) {
      return 'Fecha no disponible';
    }

    const date = new Date(timestamp);
    return date.toLocaleString(); // O utiliza el formato que desees
  }

  searchByDate(event: any): void {
    const searchTerm = event.target.value.toLowerCase();

    this.filteredEarthquakes = this.earthquakes
      .filter((earthquake: Earthquake) => {
        const formattedDate = this.formatDate(earthquake.properties.time);
        return formattedDate.toLowerCase().includes(searchTerm);
      })
      .slice(0, 5); // Filtrar y mostrar solo los primeros 5
  }
}
