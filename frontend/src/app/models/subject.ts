import {Student} from "./student";

export class Subject {
  _id: string;
  name: string;
  students:[string]

  constructor(name: string/*, students: [string]*/) {
    this.name = name;
    //this.students = students;
  }
}

