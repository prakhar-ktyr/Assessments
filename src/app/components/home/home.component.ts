import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { User} from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  assessmentName = "Angular V18"
  arrAssessmentNames = ["ROR V18", "Angular V18", "React V18"]
  arrAssessments = [
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
  // arrUsers = [
  //   new User(1, "John", "Doe", "johndoe@gmail.com"),
  //   new User(2, "Jane", "Doe", "janedoe@gmail.com"),
  //   new User(3, "John", "Smith", "johnsmith@gmail.com")
  // ]
  constructor(private router:Router){
    
  }

  displayDetails(aid:number,  aName: string, aDescription: string) {
    this.router.navigate(["viewDetails/" + aid]) ; 
  }
}
