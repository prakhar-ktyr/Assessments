import { Injectable } from '@angular/core';
import { Assessment } from '../models/assessment';
import { Question } from '../models/questions';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  arrAssessments: Assessment[] = [];

  constructor() {
    this.arrAssessments = [
      new Assessment(1, "Ruby on Rails",
        "This assessment covers Ruby on Rails, a server-side web application framework. Test your skills in MVC architecture, routing, and more.",
        "/assets/images/ror.png", []),
      new Assessment(2, "Angular",
        "This assessment covers Angular, a front-end web application framework. Test your skills in TypeScript, components, and more.",
        "/assets/images/angular.png", []),
      new Assessment(3, "React",
        "This assessment covers React, a front-end web application framework. Test your skills in JSX, components, and more.",
        "/assets/images/react.webp", [])
    ];
  }

  getAssessments(): Observable<Assessment[]> {
    return of(this.arrAssessments);
  }

  getAssessmentById(id: number): Assessment {
    return this.arrAssessments.find(assessment => assessment.id === id) || new Assessment(0, "", "", "", []);
  }

  addAssessment(assessment: Assessment): Observable<Assessment[]> {
    this.arrAssessments.push(assessment);
    return of(this.arrAssessments);
  }
}
