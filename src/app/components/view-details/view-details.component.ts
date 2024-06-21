import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  assessment: Assessment = new Assessment(0, "", "", "", [], 0);

  constructor(private activatedRoute: ActivatedRoute, private assessmentService: AssessmentService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const assessmentId = params['id'];
      this.loadAssessmentDetails(assessmentId);
    });
  }

  loadAssessmentDetails(id: number): void {
    this.assessment = this.assessmentService.getAssessmentById(id);
  }
}
