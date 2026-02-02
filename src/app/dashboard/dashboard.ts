import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthState } from '../services/auth-state';
import { interval, Subscription } from 'rxjs';
import { UserService } from '../services/users';
import { Studentservice } from '../services/student';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  currentUser: any;
  currentTime = new Date();
  currentSection = 'dashboard';
  teacherData:any[] = [];
  studentData:any[] = [];
  private userService = inject(UserService);
  private studentService = inject(Studentservice);



ngOnInit() {
    this.getUser();
    this.getStudents();
    this.currentUser = {
      name: this.authState.getMail()?.split('@')[0] || 'User',
      email: this.authState.getMail(),
      role: this.authState.getRole()
    };

    this.startRealTimeUpdates();
  }

  //GET Teacher Data  
  getUser() {
    this.userService.getUser().subscribe((data:any) => {      
      // Filter only teachers from the array
      this.teacherData = data.filter((user: any) => user.role === 'teacher');
      // console.log('Filtered teachers:', this.teacherData);
    })
  }

  getStudents(){
    this.studentService.getStudents().subscribe((data:any) => {
      this.studentData = data;
      console.log('Students Data:', this.studentData);
    })
  }

  

  private timeSubscription: Subscription | undefined = undefined;

  constructor(
    private authState: AuthState,
    private router: Router
  ) { }

  ngOnDestroy() {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  startRealTimeUpdates() {
    this.timeSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date();
    });
  }

  logout() {
    this.authState.logout();
    this.router.navigate(['/login']);
  }

  showSection(section: string) {
    this.currentSection = section;
  }
}
