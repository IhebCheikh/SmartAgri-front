import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensors.service';
import { AuthService } from '../services/auth.service';
import { SensorRequest } from '../models/request.model';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'], // Notez `styleUrls` au lieu de `styleUrl`
})
export class RequestComponent implements OnInit {
  isAdmin: boolean = false;
  requests: SensorRequest[] = [];
  newRequest: Partial<SensorRequest> = {};
  showRequestForm: boolean = false;

  constructor(private requestService: SensorService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getRole() === 'admin'|| this.authService.getRole() === 'superadmin';
    console.log(this.isAdmin)
    this.loadRequests();
  }

  loadRequests(): void {
    const userId = this.authService.getCurrentUserId();
    if (this.isAdmin) {
      this.requestService.getSensorRequests().subscribe(
        (requests) => (this.requests = requests),
        (error) => console.error('Error fetching requests:', error)
      );
    } else if (userId) {
      this.requestService.getUserRequests(userId).subscribe(
        (requests) => (this.requests = requests),
        (error) => console.error('Error fetching user requests:', error)
      );
    }
  }



  updateRequestStatus(requestId: string, status: 'approved' | 'rejected'): void {
    console.log(requestId, status)
    this.requestService.updateSensorRequest(requestId, status).subscribe(
      () => this.loadRequests(),
      (error) => console.error('Error updating request status:', error)
    );
  }

}
