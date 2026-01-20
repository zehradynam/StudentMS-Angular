import { Component, inject, signal, computed } from '@angular/core';
import { Studentservice } from '../services/student';
import { Student as Studentmodel } from '../models/student';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '../services/auth-state';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  private studentService = inject(Studentservice);
  showModal = false;
  editForm: FormGroup;
  currentStudentId: number = 0;

  spinner = signal<boolean>(true);
  errormsg = signal<string>('');
  searchItem = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private Studentservice: Studentservice,
    public authState: AuthState
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]
    });
  }


  showStudents = signal<Studentmodel[]>([]);
  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.showStudents.set(data);
        // console.log(this.showStudents());

        this.spinner.set(false);
      },
      error: (err) => {
        console.log("Error:", err);
        this.errormsg.set(err.message);
        this.spinner.set(false);

      }
    })
  }
  filteredStudents = computed(() => {
    const term = this.searchItem().toLowerCase();
    if (!term) {
      return this.showStudents();
    }
    return this.showStudents().filter(s =>
      s.email.toLowerCase().includes(term)
    );
  });

  openEditModel(student: Studentmodel) {
    this.currentStudentId = student.id;
    this.editForm.patchValue({
      name: student.name,
      email: student.email,
      age: student.age
    });
    this.showModal = true


  }


  saveEdit() {
    if (this.editForm.valid) {
      const updatedStudent = {
        id: this.currentStudentId,
        ...this.editForm.value
      };

      this.studentService.updateStudent(this.currentStudentId, updatedStudent).subscribe(() => {
        this.studentService.getStudents().subscribe((data) => {
          this.showStudents.set(data);
        });
        this.closeModal();
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.editForm.reset();
  }

  delete(id: number) {
    console.log("student Id:", id)
    if (confirm(`Do you want to delete Student Data with Id: ,${id}`)) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.showStudents.set(this.showStudents().filter(s => s.id !== id));
      });

    }
  }


}


