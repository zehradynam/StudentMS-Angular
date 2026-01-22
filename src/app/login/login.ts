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
  templateUrl: './login.html'
})
export class Login
{

  userData: User = {} as User;
  showError = signal<boolean>(false);
  showSuccess = signal<boolean>(false);

  signupData: User = {} as User;


  constructor(
    private userService: UserService,
    public authState: AuthState
  ) { }

  signUp() {
     console.log('I am In:' + JSON.stringify(this.signupData));
  this.userService.signUp(this.signupData).subscribe({
    next: () => {
      console.log('User signed up successfully')
      this.showSuccess.set(true);
      this.showError.set(false);
    },
    error: (err) => {
      console.error('User sign up failed:', err);
      if (err.error.errors) {
        console.error('Validation Errors:', err.error.errors);
      }
    }
  });
  }



  login() {
    console.log("iss logged in :", this.showError());
    console.log('I am In:' + JSON.stringify(this.userData));
    this.userService.loginUser(this.userData).subscribe({
      next: (res) => {
        if (res && res.token) {
          this.authState.login(res.token)
          this.showError.set(false);
          this.showSuccess.set(false);

        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.showError.set(true);
      }
    });
  }
}
