import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sensor } from '../models/sensor.model';
import {User} from "../models/user.model";
import {SensorData} from "../models/sensor-data.model";
import {SensorRequest} from "../models/request.model";

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private apiUrl = 'http://localhost:3000/sensors';

  constructor(private http: HttpClient) {}

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.apiUrl);
  }

  addSensor(sensor: any): Observable<any> {
    return this.http.post<Sensor>(this.apiUrl, sensor);
  }
  addSensorRequestt(sensorRequest: SensorRequest): Observable<any> {
    console.log(sensorRequest)
    return this.http.post('http://localhost:3000/sensor-requests', sensorRequest);
  }
  addSensorRequest(requestData: Partial<SensorRequest>): Observable<SensorRequest> {
    return this.http.post<SensorRequest>('http://localhost:3000/sensor-requests', requestData);
  }

  /*
  submitSensorRequest(requestData: { type: string; location: string; reason: string }) {
    return this.http.post('http://localhost:3000/sensor-requests', requestData);
  }*/
  getSensorRequests(): Observable<SensorRequest[]> {
    return this.http.get<SensorRequest[]>(`http://localhost:3000/sensor-requests`);
  }
  getUserRequests(userId: string): Observable<SensorRequest[]>  {
    return this.http.get<SensorRequest[]>(`http://localhost:3000/sensor-requests/${userId}`);
  }

  updateSensorRequest(requestId: string, updatedStatus: "approved" | "rejected"): Observable<SensorRequest> {
    const payload = { status: updatedStatus }; // Objet attendu côté backend
    return this.http.patch<SensorRequest>(`http://localhost:3000/sensor-requests/${requestId}`, payload);
  }

  deleteSensorRequest(requestId: string) {
    return this.http.delete(`http://localhost:3000/sensor-requests/${requestId}`);
  }

  getUserSensors(userId: string): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(`${this.apiUrl}/user/${userId}`);
  }


  togglePump(sensorId: string, status: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/toggle-pump/${sensorId}/`, { sensorId, status });
  }
  updateSensor(id: string, sensor: Sensor): Observable<Sensor> {
    return this.http.put<Sensor>(`${this.apiUrl}/${id}`, sensor);
  }
  getSensorData(sensorId: string): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(`${this.apiUrl}/data/${sensorId}`);
  }
  deleteSensor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  detectAnomaly(values: number[][]): Observable<{ predictions: number[] }> {
    return this.http.post<{ predictions: number[] }>(`${this.apiUrl}/detect-anomaly`, { values });
  }
  // Détecter les anomalies des capteurs pour un utilisateur
  detectAnomalies(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/detect-anomaly`);
  }


}
