import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensors.service';
import { Sensor } from '../models/sensor.model';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  sensors: Sensor[] = [];
  sensorForm: Sensor = {
    bd: '',
    name: '',
    type: '',
    location: '',
    status: ''
  };

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    this.loadSensors();
  }

  loadSensors(): void {
    this.sensorService.getSensors().subscribe(
      (data: Sensor[]) => {
        this.sensors = data;
      },
      (error) => {
        console.error('Failed to load sensors', error);
      }
    );
  }

  onSubmit(): void {
    if (this.sensorForm.id) {
      this.updateSensor();
    } else {
      this.addSensor();
    }
  }

  addSensor(): void {
    this.sensorService.addSensor(this.sensorForm).subscribe(
      (sensor: Sensor) => {
        this.sensors.push(sensor);
        this.resetForm();
      },
      (error) => {
        console.error('Failed to add sensor', error);
      }
    );
  }

  editSensor(sensor: Sensor): void {
    this.sensorForm = { ...sensor };
  }

  updateSensor(): void {
    this.sensorService.updateSensor(this.sensorForm).subscribe(
      (updatedSensor: Sensor) => {
        const index = this.sensors.findIndex(s => s.id === updatedSensor.id);
        if (index !== -1) {
          this.sensors[index] = updatedSensor;
        }
        this.resetForm();
      },
      (error) => {
        console.error('Failed to update sensor', error);
      }
    );
  }

  deleteSensor(sensorId: string | undefined): void {
    this.sensorService.deleteSensor(sensorId).subscribe(
      () => {
        this.sensors = this.sensors.filter(sensor => sensor.id !== sensorId);
      },
      (error) => {
        console.error('Failed to delete sensor', error);
      }
    );
  }

  resetForm(): void {
    this.sensorForm = {
      bd: '',
      name: '',
      type: '',
      location: '',
      status: ''
    };
  }
}
