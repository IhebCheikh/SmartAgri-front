import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from '../models/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private apiUrl = 'http://localhost:3000/sensors'; // URL de l'API

  constructor(private http: HttpClient) {}

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.apiUrl);
  }

  addSensor(sensor: Sensor): Observable<Sensor> {
    return this.http.post<Sensor>(this.apiUrl, sensor);
  }

  deleteSensor(sensorId: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sensorId}`);
  }

  updateSensor(sensor: Sensor): Observable<Sensor> {
    return this.http.put<Sensor>(`${this.apiUrl}/${sensor.id}`, sensor);
  }
}
