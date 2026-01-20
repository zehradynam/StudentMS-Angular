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
    }
    else{
      console.log('Access Denied')
    }
  }

  login(currToken :string){
    localStorage.setItem('token',currToken)
     const decoded: any = jwtDecode(currToken);
      this.getMail.set(decoded['Email']);
      this.getRole.set(decoded['role']);
      this.loggedIn.set(true);

  }

  logout(){
    localStorage.removeItem('token');
  this.getMail.set('');
  this.getRole.set('');
  this.loggedIn.set(false);
  }


}
