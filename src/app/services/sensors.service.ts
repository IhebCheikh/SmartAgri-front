import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from '../models/sensor.model';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private apiUrl = 'http://localhost:3000/sensors';

  constructor(private http: HttpClient) {}

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.apiUrl);
  }

  addSensorr(sensorData: any): Observable<any> {
    return this.http.post('/api/sensors', sensorData);
  }

  addSensor(sensor: any): Observable<any> {
    return this.http.post<Sensor>(this.apiUrl, sensor);
  }

  getUserSensors(userId: string): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrl}/user/${userId}`);
  }


  togglePump2(sensorId: string, status: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}/${sensorId}/toggle-pump`, { status }, { headers });
  }
  togglePump(sensorId: string, status: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle-pump/${sensorId}/`, { sensorId, status });
  }
  updateSensor(id: string, sensor: Sensor): Observable<Sensor> {
    return this.http.put<Sensor>(`${this.apiUrl}/${id}`, sensor);
  }

  deleteSensor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
