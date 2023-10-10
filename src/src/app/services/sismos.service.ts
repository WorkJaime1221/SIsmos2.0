import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class SismosService {

  private earthquakeAPIUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
  
  constructor(private http: HttpClient) {}

  getCatalogs(): Observable<ApiResult> {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}`
    );
  }

  getEarthquakes(): Observable<any> {
    const startTime = '2023-01-01';
    const endTime = '2023-01-10';
    const format = 'geojson';

    const url = `${this.earthquakeAPIUrl}?format=${format}&starttime=${startTime}&endtime=${endTime}`;

    return this.http.get(url);
  }

}
