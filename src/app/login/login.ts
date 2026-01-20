import { Component, signal } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/users';
import { CommonModule } from '@angular/common';
import { AuthState } from '../services/auth-state';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  userData: User = {} as User;
  showError=signal<boolean>(false);


  constructor(
    private userService: UserService,
    public authState: AuthState
  ) {}

  login() {
    console.log("iss logged in :" ,this.showError());
    console.log('I am In:'+ this.userData);
    this.userService.loginUser(this.userData).subscribe({
      next: (res) => {
        if (res && res.token) {
          this.authState.login(res.token)
          this.showError.set(false);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.showError.set(true);
      }
    });
  }
}
