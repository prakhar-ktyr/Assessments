import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { LocalStorageService } from '../../services/local-storage.service';
import { AssessmentService } from '../../services/assessment.service';
import { TraineeService } from '../../services/trainee.service';
import { AssessmentTrainees } from '../../models/assessmentTrainess';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  arrAssessments: Assessment[] = [];
  loggedUserId: string = "";
  loggedUserRole: string = "";
  quantityMap = new Map();
  arrAssessmentTrainees: AssessmentTrainees[] = [];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private assessmentService: AssessmentService,
    private traineeService: TraineeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loggedUserId = this.localStorageService.getItem("loggedUserId") || "0";
    this.loggedUserRole = this.localStorageService.getItem("role") || "trainee";

    if (this.loggedUserRole === 'Admin') {
      this.fetchAssessmentsForAdmin();
    } else if (this.loggedUserRole === 'Trainee') {
      this.fetchAssessmentsForTrainee();
    } else {
      this.fetchAssessmentsForOther();
    }
  }

  fetchAssessmentsForAdmin(): void {
    this.assessmentService.getAssessments().subscribe(data => {
      this.arrAssessments = data;
      this.cdr.detectChanges();
    });
  }

  fetchAssessmentsForTrainee(): void {
    this.traineeService.getAssessmentTrainess().subscribe(data => {
      this.arrAssessmentTrainees = data;

      let arrId: string[] = [];
      this.arrAssessmentTrainees.forEach(trainee => {
        if (trainee.traineeId === this.loggedUserId) {
          arrId.push(trainee.assessmentId);
          this.quantityMap.set(trainee.assessmentId, trainee.quantity);
        }
      });

      this.assessmentService.getAssessments().subscribe(data => {
        this.arrAssessments = data.filter(assessment => arrId.includes(String(assessment.id)));
        this.cdr.detectChanges();
      });
    });
  }

  fetchAssessmentsForOther(): void {
    this.assessmentService.getAssessments().subscribe(data => {
      this.arrAssessments = data.filter(assessment => String(assessment.facultyId) === this.loggedUserId);
      this.cdr.detectChanges();
    });
  }

  displayDetails(aid: number, aName: string, aDescription: string): void {
    this.router.navigate(["viewDetails/" + aid]);
  }

  attemptAssessment(){
    
  }
}
