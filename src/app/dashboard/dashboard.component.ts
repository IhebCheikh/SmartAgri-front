import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensors.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Sensor} from "../models/sensor.model";
import {AuthService} from "../services/auth.service";
import {SensorData} from "../models/sensor-data.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  lightIntensity: string = '';
  humidity: string = '';
  temperature: string = '';
  timestamp: string = '';

  sensors: any[] = [];
  sensorData: { [key: string]: SensorData[] } = {};

  constructor(private sensorService: SensorService, private userService: AuthService) {}


  ngOnInit(): void {
    this.loadUserSensors();  // Charger les capteurs à l'initialisation
  }
  loadUserSensors(): void {
    const userId = this.userService.getCurrentUserId();  // Récupérer l'ID de l'utilisateur connecté
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    this.sensorService.getUserSensors(userId).subscribe(
      (sensors) => {
        this.sensors = sensors;
        sensors.forEach(sensor => {
          this.loadSensorData(sensor._id);
        });
      },
      (error) => {
        console.error('Error fetching sensors', error);
      }
    );
  }

  loadSensorData(sensorId: string): void {
    this.sensorService.getSensorData(sensorId).subscribe(
      (data) => {
        this.sensorData[sensorId] = data;  // Stocker les données du capteur par ID
      },
      (error) => {
        console.error('Error fetching sensor data', error);
      }
    );
  }

  togglePump(sensorId: string, status: boolean): void {
    this.sensorService.togglePump(sensorId, status).subscribe();
    this.loadUserSensors();
    this.loadUserSensors();

  }
}
