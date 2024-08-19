import { Component, OnInit } from '@angular/core';
import { SensorService } from '../services/sensors.service';
import { Sensor } from '../models/sensor.model';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sensors: Sensor[] = [];
  isFormVisible = false;
  sensorForm: Sensor = {
    _id: '',
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

  showAddSensorForm(): void {
    this.isFormVisible = true;
    this.resetForm();
  }

  hideForm(): void {
    this.isFormVisible = false;
  }

  onSubmit(): void {
    if (this.sensorForm._id) {
      this.updateSensor(this.sensorForm);
    } else {
      this.addSensor(this.sensorForm);
    }
    this.hideForm();
  }

  addSensor(sensor: Sensor): void {
    this.sensorService.addSensor(sensor).subscribe(
      (newSensor: Sensor) => {
        this.sensors.push(newSensor);
      },
      (error) => {
        console.error('Failed to add sensor', error);
      }
    );
  }


  editSensor(sensor: Sensor) {
    this.sensorForm = sensor;
    this.isFormVisible = true;
  }
  updateSensor(sensor: Sensor): void {
    this.sensorForm = sensor;
    if (!sensor._id) {
      console.error('Sensor ID is missing');
      return;
    }

    this.sensorService.updateSensor(sensor._id, sensor).subscribe(
      (updatedSensor: Sensor) => {
        const index = this.sensors.findIndex(s => s._id === updatedSensor._id);
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
  deleteSensor(sensor: Sensor) {
    const sensorId = sensor._id;

    if (!sensorId) {
      console.error('Sensor ID is missing');
      return;
    }

    this.sensorService.deleteSensor(sensorId)
      .subscribe(
        () => {
          this.sensors = this.sensors.filter(sensor => sensor._id !== sensorId);
          console.log('Sensor deleted successfully');
        },
        (error) => {
          console.error('Error deleting sensor:', error);
        }
      );
  }

  resetForm(): void {
    this.sensorForm = {
      _id: '',
      bd: '',
      name: '',
      type: '',
      location: '',
      status: ''
    };
  }
}
