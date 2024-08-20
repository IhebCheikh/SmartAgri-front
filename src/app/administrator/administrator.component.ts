import { Component } from '@angular/core';
import {User} from "../models/user.model";
import {AuthService} from "../services/auth.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-administrator',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css'
})
export class AdministratorComponent {
  users: User[] = [];
  selectedUser: User | null = null;  // Pour stocker l'utilisateur sélectionné

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getOneUser(id: string | undefined): void {
    this.userService.getUserById(id).subscribe(user => {
      this.selectedUser = user;
    });
  }
  clearSelectedUser(): void {
    this.selectedUser = null; // Pour désélectionner l'utilisateur
  }
  addUser() {
    // Logic to add a user
  }

  editUser(user: User) {
    // Logic to edit a user
  }

  deleteUser(id: string | undefined) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
