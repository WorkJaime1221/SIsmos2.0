import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { SismosService } from 'src/app/services/sismos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{

  earthquakes: any;

  constructor(private earthquakeService: SismosService) { }

  ngOnInit(): void {
    this.earthquakeService.getEarthquakes().subscribe(data => {
      this.earthquakes = data;
      console.log('Datos de terremotos:', this.earthquakes);
    });
  }
  

}
