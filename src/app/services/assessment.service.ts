import { Injectable } from '@angular/core';
import { Assessment } from '../models/assessment';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  arrAssessments: Assessment[] = []

  
  constructor() { 
    this.arrAssessments = [new Assessment(1, "Ruby on Rails", 
      "This assessment covers Ruby on Rails, a server-side web application framework. Test your skills in MVC architecture, routing, and more.", 
      "/assets/images/ror.png"),
      new Assessment(2, "Angular", 
      "This assessment covers Angular, a front-end web application framework. Test your skills in TypeScript, components, and more.", 
      "/assets/images/angular.png"),
      new Assessment(3, "React", 
      "This assessment covers React, a front-end web application framework. Test your skills in JSX, components, and more.",
      "/assets/images/react.webp")
    ]
  }

  getAssessments() {
    return this.arrAssessments
  }

  getAssessmentById(id: number) {
    for(var i=0; i<this.arrAssessments.length; i++) {
      if(id == this.arrAssessments[i].id) {
        return this.arrAssessments[i]
      }
      
  }
  return new Assessment(0, "", "", "")
}
}
