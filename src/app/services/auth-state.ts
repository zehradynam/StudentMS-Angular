import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  loggedIn = signal(false);
  getMail = signal('');
  getRole = signal('');

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);

      this.getMail.set(decoded['Email']);
      this.getRole.set(decoded['role']);
      this.loggedIn.set(true);
    } else {
      console.log('Access Denied');
    }
  }

  login(currToken: string) {
    localStorage.setItem('token', currToken);
    const decoded: any = jwtDecode(currToken);
    this.getMail.set(decoded['Email']);
    this.getRole.set(decoded['role']);
    this.loggedIn.set(true);

    const currTime = Date.now() / 1000;
    // console.log('Token exp time:', decoded['exp'], 'Current time:', currTime);
   
    console.log('Time remaining:', Math.round((decoded['exp'] - currTime) / 60), 'minutes');

    if (decoded['exp'] < currTime) {
      console.log('Token expired');
      this.logout();
    }

    //if valid token
    else {
      const timeremaining = (decoded['exp'] - currTime) * 1000;
      setTimeout(() => {
        console.log('Token expired due to timeout');
        this.logout();
      }, timeremaining);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.getMail.set('');
    this.getRole.set('');
    this.loggedIn.set(false);
  }
}
