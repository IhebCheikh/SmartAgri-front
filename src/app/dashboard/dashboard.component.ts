import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensors.service';
import {NgForOf} from "@angular/common"; // Créez ce service si ce n'est pas encore fait

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  lightIntensity: string = '';
  humidity: string = '';
  temperature: string = '';

  sensors: any[] = [];

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    this.loadUserSensors();
  }

  loadUserSensors(): void {
    this.sensorService.getUserSensors().subscribe(
      (data) => {
        this.sensors = data;
      },
      (error) => {
        console.error('Error fetching sensors', error);
      }
    );
  }

  togglePump(sensorId: string, status: boolean): void {
    // Envoyer la requête pour actionner la pompe d'eau (activer/désactiver)
    this.sensorService.togglePump(sensorId, status).subscribe();
  }
}
