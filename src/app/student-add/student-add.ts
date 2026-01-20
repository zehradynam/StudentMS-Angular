import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Studentservice } from '../services/student';
import { AuthState } from '../services/auth-state';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-add.html',
  styleUrl: './student-add.css'
})
export class StudentAdd {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private Studentservice: Studentservice,
    public authState: AuthState
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]
    });
  }

  addstudent() {
    this.Studentservice.addStudents(this.studentForm.value).subscribe(() => {
    })
  }
}