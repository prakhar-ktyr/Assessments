import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.scss'
})
export class AssessmentsComponent {

  arrAssessments:Assessment[] = []
  assessment:Assessment = new Assessment(0, "", "", "") 

  constructor(private assessmentService: AssessmentService) { 
    this.arrAssessments = this.assessmentService.getAssessments()
  }

  displayDetails(aid:number, aName: string, aDescription: string) {
    console.log(aName + " - " + aDescription)
    //console.log(this.assessmentService.getAssessmentById(aid))
    this.assessment = this.assessmentService.getAssessmentById(aid)
    console.log(this.assessment)
  }

}
