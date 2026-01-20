import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student as StudentModel } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class Studentservice {

  // private apiUrl = 'http://localhost:5204/api/Students';
    private apiUrl = 'https://studentms.runasp.net/api/Students';

  constructor(private https: HttpClient) { }


  getStudents(): Observable<StudentModel[]> {
    return this.https.get<StudentModel[]>(this.apiUrl);
  }

  addStudents(student: StudentModel): Observable<StudentModel> {
    return this.https.post<StudentModel>(this.apiUrl, student);
  }


  updateStudent(id: number, student: StudentModel): Observable<StudentModel> {
    return this.https.put<StudentModel>(`${this.apiUrl}/${id}`, student);
  }
  deleteStudent(id:number):Observable<void> {
    return this.https.delete<void>(this.apiUrl +"/"+id);
  }

}





