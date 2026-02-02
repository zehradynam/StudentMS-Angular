import { Routes } from '@angular/router';
import { Login } from './login/login'
import { Home } from './home/home'
import { AuthGuard } from './services/auth.guard';
import { StudentAdd } from './student-add/student-add';
import { AccessDenied } from './access-denied/access-denied';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'teacher'] }
  },
  { path: 'access-denied', component: AccessDenied },
  {
    path: 'student-add',
    component: StudentAdd,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'students-list',
    canActivate: [AuthGuard],
    data: { roles: ['Admin', 'teacher'] },
    loadComponent: () =>
      import('./student-list/student-list')
        .then(m => m.StudentList)
  },
  { 
    path: 'documentation', 
    loadComponent: () => import('./documentation/documentation').then(m => m.Documentation)
  },
  { 
    path: 'privacy-policy', 
    loadComponent: () => import('./privacy-policy/privacy-policy').then(m => m.PrivacyPolicy)
  },
  { 
    path: 'contact-support', 
    loadComponent: () => import('./contact-support/contact-support').then(m => m.ContactSupport)
  },
  { path: '**', redirectTo: '/home' }
];
