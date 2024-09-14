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
  sensors: any[] = [];
  sensorData: { [key: string]: SensorData[] } = {};
  selectedSensorId: string | null = null;  // Capteur sélectionné

  constructor(private sensorService: SensorService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserSensors();  // Charger les capteurs à l'initialisation
  }

  loadUserSensors(): void {
    const userId = this.authService.getCurrentUserId();  // Récupérer l'ID de l'utilisateur connecté
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    this.sensorService.getUserSensors(userId).subscribe(
      (sensors) => {
        this.sensors = sensors;
        sensors.forEach(sensor => {
          this.loadSensorData(sensor._id);  // Charger les données des capteurs
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

  selectSensor(sensorId: string): void {
    this.selectedSensorId = sensorId;  // Définir le capteur sélectionné
  }

  getSensorName(sensorId: string): string {
    const sensor = this.sensors.find(s => s._id === sensorId);
    return sensor ? sensor.name : '';
  }

  togglePump(sensorId: string, status: boolean): void {
    this.sensorService.togglePump(sensorId, status).subscribe(
      () => {
        // Mettre à jour l'état du capteur
        this.loadUserSensors();
      },
      (error) => {
        console.error('Error toggling pump', error);
      }
    );
  }
}
