import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensors.service';
import { AuthService } from '../services/auth.service';
import { SensorRequest } from '../models/request.model';
import { Sensor } from '../models/sensor.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  isAdmin: boolean = false;
  requests: SensorRequest[] = [];
  users: any[] = []; // Liste des utilisateurs disponibles
  showRequestForm: boolean = false;
  selectedRequest: SensorRequest | null = null;
  sensorForm: Partial<Sensor> = {};

  constructor(
    private sensorService: SensorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = ['admin', 'superadmin'].includes(<string>this.authService.getRole());
    this.loadRequests();
    this.loadUsers(); // Charger les utilisateurs pour l'attribution
  }

  loadRequests(): void {
    this.sensorService.getSensorRequests().subscribe(
      (requests) => {
        this.requests = requests;
      },
      (error) => {
        console.error('Error loading requests:', error);
      }
    );
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  updateRequestStatus(request: SensorRequest, status: 'approved' | 'rejected'): void {
    if (status === 'approved') {
      // Pré-remplir le formulaire avec les données de la demande
      this.sensorForm = {
        name: request.name,
        type: request.type,
        location: request.location,
        status: false, // Statut par défaut
      };
      this.selectedRequest = request; // Garde une référence pour ajouter le capteur ensuite
      this.showRequestForm = true; // Affiche le formulaire
    } else {
      this.sensorService.updateRequestStatus(request._id, status).subscribe(
        () => {
          this.loadRequests();
        },
        (error) => {
          console.error('Error updating request status:', error);
        }
      );
    }
  }

  submitRequest(): void {
    if (this.selectedRequest) {
      // Vérifie si un utilisateur a été sélectionné
      if (!this.sensorForm.userId) {
        console.error('User must be selected before submitting the form');
        return;
      }

      const newSensor = {
        ...this.sensorForm,
        userId: this.sensorForm.userId, // Utilisateur sélectionné
        status: false, // Statut par défaut
      };

      // Ajouter un nouveau capteur avec les données du formulaire
      this.sensorService.addSensor(newSensor).subscribe(
        (response) => {
          console.log('Sensor added:', response);
          // Mettre à jour le statut de la demande à "approuvé"
          this.sensorService.updateRequestStatus(this.selectedRequest!._id, 'approved').subscribe(
            () => this.loadRequests(),
            (error) => console.error('Error updating request status:', error)
          );
          this.resetForm();
        },
        (error) => {
          console.error('Error adding sensor:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.showRequestForm = false;
    this.selectedRequest = null;
    this.sensorForm = {};
  }
}
