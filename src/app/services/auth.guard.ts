import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthState } from './auth-state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authState: AuthState,
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean{

    const userRole=this.authState.getRole();

    const alloRoutes=route.data['roles'] as string[];

    if(!this.authState.loggedIn()){
      this.router.navigate(['/login']);
      return false;
    }

    if(alloRoutes && !alloRoutes.includes(userRole)){
      // console.log('Allowed Roles:', alloRoutes);
      // console.log('Current role:', userRole);
      this.router.navigate(['/access-denied'])
        return false;

    }
    return true ;




    


  }
}
