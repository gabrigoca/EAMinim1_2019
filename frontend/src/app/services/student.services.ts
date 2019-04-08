import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class StudentServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainStudent(studentId) {
    return this.http.get(this.environment.urlStudent + "/"+studentId, {observe: 'response'})
  }
  addStudent(subjectId, Student) {
    return this.http.post(this.environment.urlStudent + "/"+subjectId,Student, {observe: 'response'})
  }
}
