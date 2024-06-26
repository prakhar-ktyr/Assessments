import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../models/questions';
import { AssessmentService } from '../../services/assessment.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attendance } from '../../models/attendance';
import { AttendanceService } from '../../services/attendance.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AssessmentScoreService } from '../../services/assessment-score.service';
import { AssessmentScore } from '../../models/assessmentScore';

@Component({
  selector: 'app-attempt-assessment',
  templateUrl: './attempt-assessment.component.html',
  styleUrl: './attempt-assessment.component.scss',
})
export class AttemptAssessmentComponent implements OnInit {
  hasStarted: boolean = false;
  assessmentId: number = 0;
  arrQuestions: Question[] = [];
  questionForm!: FormArray;
  finalScore: number = -1;
  startTime: Date = new Date();
  loggedUserId: string = '';
  constructor(
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assessmentService: AssessmentService,
    private attendanceService: AttendanceService,
    private assessmentScoreService:AssessmentScoreService
  ) {
    this.loggedUserId = this.localStorageService.getItem('loggedUserId') || '0';

    this.activatedRoute.params.subscribe((params) => {
      this.assessmentId = params['id'];
    });
    this.assessmentService
      .getAssessmentById(this.assessmentId)
      .subscribe((data) => {
        this.arrQuestions = data.questions;
        // console.log(data.questions) ;
        console.log(this.arrQuestions);
        this.questionForm = this.fb.array(
          this.arrQuestions.map(() =>
            this.fb.group({
              answer: ['', Validators.required],
            })
          )
        );
      });
  }
  ngOnInit(): void {}

  submitAnswers(): void {
    const answers = this.questionForm.value;
    console.log('Submitted answers:', answers);
    this.finalScore = this.getScore(answers);

    this.assessmentScoreService.getAssessmentScore().subscribe(data => {
      let totalAssessmentScore = data.length ; 
      let as = new AssessmentScore(totalAssessmentScore + 1 , this.assessmentId , parseInt(this.loggedUserId) , this.finalScore) ; 
      this.assessmentScoreService.postAssessmentScore(as).subscribe(data =>{
        console.log("Added assessment score") ; 
      })
    })
    // this.assessmentScoreService.po
    // Handle the submission logic here
  }

  getScore(answers: any) {
    console.log(answers);
    let score: number = 0;
    for (let i = 0; i < this.arrQuestions.length; i++) {
      let ans = answers[i].answer;
      if (this.arrQuestions[i].type === 'true-false') {
        if (this.arrQuestions[i].correctAnswer === ans.toString()) {
          score += 1;
        }
      } else {
        if (this.arrQuestions[i].correctAnswer === ans) {
          score += 1;
        }
      }
    }
    return score;
  }
  getFormGroup(index: number): FormGroup {
    return this.questionForm.at(index) as FormGroup;
  }

  startAssessment() {
    this.hasStarted = true;
    this.startTime = new Date();
    this.attendanceService.getAttendance().subscribe((data) => {
      let totalAttendance = data.length;
      console.log(totalAttendance) ; 
      let newAttendance = new Attendance(String(totalAttendance + 1), this.loggedUserId , new Date() , "success");
      this.attendanceService.addAttendance(newAttendance).subscribe(data => {
        console.log("attendance added")
      })
    });
  }
}
