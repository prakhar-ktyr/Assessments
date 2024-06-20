import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { User} from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  arrAssessments:Assessment[] = [];
  constructor(private router:Router , private assessmentService : AssessmentService){
    this.assessmentService.getAssessments().subscribe(data =>{
      for(let i = data.length - 1 ; i >= data.length - 3 ; i--){
        this.arrAssessments.push(data[i]) ; 
      }

    }) 
  }

  displayDetails(aid:number,  aName: string, aDescription: string) {
    this.router.navigate(["viewDetails/" + aid]) ; 
  }
}
