import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.scss'
})
export class AssessmentsComponent {

  arrAssessments:Assessment[] = []
  assessment:Assessment = new Assessment(0, "", "", "", [], 0)

  constructor(private assessmentService: AssessmentService , private router : Router) { 
    this.assessmentService.getAssessments().subscribe((assessments: Assessment[]) => {
      this.arrAssessments = assessments;
    });
  }
  
  displayDetails(aid:number,  aName: string, aDescription: string) {
    this.router.navigate(["viewDetails/" + aid]) ; 
  }
}
