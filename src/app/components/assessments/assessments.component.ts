import { Component, OnInit } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {

  arrAssessments: Assessment[] = [];
  pagedAssessments: Assessment[] = [];
  assessment: Assessment = new Assessment(0, "", "", "", [], 0);
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(private assessmentService: AssessmentService, private router: Router) { }

  ngOnInit(): void {
    this.assessmentService.getAssessments().subscribe((assessments: Assessment[]) => {
      this.arrAssessments = assessments;
      this.totalPages = Math.ceil(this.arrAssessments.length / this.pageSize);
      this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      this.updatePagedAssessments();
    });
  }

  updatePagedAssessments(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedAssessments = this.arrAssessments.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagedAssessments();
  }

  displayDetails(aid: number, aName: string, aDescription: string): void {
    this.router.navigate(["viewDetails/" + aid]);
  }
}
