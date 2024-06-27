import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../models/questions';
import { AssessmentService } from '../../services/assessment.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attendance } from '../../models/attendance';
import { AttendanceService } from '../../services/attendance.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { AssessmentScoreService } from '../../services/assessment-score.service';
import { AssessmentScore } from '../../models/assessmentScore';
import { MatStepper } from '@angular/material/stepper';
import { TraineeService } from '../../services/trainee.service';
import { AssessmentTrainees } from '../../models/assessmentTrainess';

@Component({
  selector: 'app-attempt-assessment',
  templateUrl: './attempt-assessment.component.html',
  styleUrl: './attempt-assessment.component.scss',
})
export class AttemptAssessmentComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  
  hasFinished:boolean = false ; 
  hasStarted: boolean = false;
  assessmentId: number = 0;
  arrQuestions: Question[] = [];
  questionForm!: FormArray;
  finalScore: number = -1;
  startTime: Date = new Date();
  loggedUserId: string = '';
  assessmentDuration:number = 0 ; 
  constructor(
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assessmentService: AssessmentService,
    private attendanceService: AttendanceService,
    private assessmentScoreService:AssessmentScoreService , 
    private traineeService:TraineeService
  ) {
    this.loggedUserId = this.localStorageService.getItem('loggedUserId') || '0';
    
    this.activatedRoute.params.subscribe((params) => {
      this.assessmentId = params['id'];
    });
    this.assessmentService
      .getAssessmentById(this.assessmentId)
      .subscribe((data) => {
        this.arrQuestions = data.questions;
        this.assessmentDuration = Number(data.time) ; 
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
    this.hasFinished = true; 
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

    this.traineeService.getAssessmentTrainess().subscribe(data => {
      let updateId = -1 ;
      let newAssessmentTrainee = new AssessmentTrainees("0" , "0" , "0" , "0") ;  
      data.forEach((ass) => {
        if(ass.assessmentId === String(this.assessmentId) && ass.traineeId === this.loggedUserId){
          let q = parseInt(ass.quantity) ; 
          ass.quantity = String(q - 1) ; 
          updateId = Number(ass.id) ; 
          newAssessmentTrainee = ass ; 
        }
        
      })

      this.traineeService.updateAssessmentTraineeById(updateId , newAssessmentTrainee).subscribe((data) => {
        console.log("Assessment quantity reduced")
      })


    })
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


  onTimeUp(): void {
    // Move to the last step and submit the form
    this.stepper.selectedIndex = this.stepper.steps.length - 1;
    if(!this.hasFinished) this.submitAnswers();
  }
}
