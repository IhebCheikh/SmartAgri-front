import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensors.service';
import {NgForOf} from "@angular/common";
import {Sensor} from "../models/sensor.model";
import {AuthService} from "../services/auth.service";

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
      (data) => {
        this.sensors = data;  // Charger les capteurs de l'utilisateur connecté
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
