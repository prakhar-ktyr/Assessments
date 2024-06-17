import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  arrCourses: Course[] = []

  constructor() {
    this.arrCourses = [
      new Course(1, "Angular Basics", "Learn the basics of Angular", 101),
      new Course(2, "Advanced Angular", "Deep dive into Angular", 102)
    ]
  }

  getCourses(): Course[] {
    return this.arrCourses;
  }

  getCourseById(id: number): Course {
    for (let i = 0; i < this.arrCourses.length; i++) {
      if (id === this.arrCourses[i].id) {
        return this.arrCourses[i];
      }
    }

    return new Course(0, "", "", 0);
  }

  addCourse(course: Course): Observable<Course[]> {
    this.arrCourses.push(course);
    console.log(this.arrCourses);
    return of(this.arrCourses);
  }
}
