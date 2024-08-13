import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { SensorService } from '../services/sensors.service';
import {Sensor} from "../models/sensor.model";

@Component({
  selector: 'app-sensor-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sensor-form.component.html',
  styleUrl: './sensor-form.component.css'
})
export class SensorFormComponent implements OnInit {
  sensorForm: FormGroup;

  constructor(private fb: FormBuilder, private sensorService: SensorService) {
    this.sensorForm = this.fb.group({
      id: [''],
      bd: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      location: ['', Validators.required],
      status: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.sensorForm.valid) {
      if (this.sensorForm.value.id) {
        this.sensorService.updateSensor(this.sensorForm.value.id)
          .subscribe(response => {
            console.log('Capteur mis à jour avec succès', response);
          }, error => {
            console.error('Erreur lors de la mise à jour du capteur', error);
          });
      } else {
        this.sensorService.addSensor(this.sensorForm.value)
          .subscribe(response => {
            console.log('Capteur ajouté avec succès', response);
          }, error => {
            console.error('Erreur lors de l\'ajout du capteur', error);
          });
      }
    }
  }

  onReset(): void {
    this.sensorForm.reset();
  }
}
