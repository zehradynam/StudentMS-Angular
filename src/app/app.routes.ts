import { Routes } from '@angular/router';
import { Login } from './login/login'
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './services/auth.guard';
import { StudentAdd } from './student-add/student-add';
import { AccessDenied } from './access-denied/access-denied';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: HomeComponent },
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
    data: { roles: ['Admin', 'Teacher'] },
    loadComponent: () =>
      import('./student-list/student-list')
        .then(m => m.StudentList)
  },
  { path: '**', redirectTo: '/home' }
];
