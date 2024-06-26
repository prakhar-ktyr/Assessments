import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../models/questions';
import { AssessmentService } from '../../services/assessment.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attempt-assessment',
  templateUrl: './attempt-assessment.component.html',
  styleUrl: './attempt-assessment.component.scss'
})
export class AttemptAssessmentComponent implements OnInit {
  assessmentId : number = 0 ; 
  arrQuestions : Question[] = [] ; 

  // arrQuestions: Question[] = [
  //   {
  //     id: 1,
  //     text: 'What is the capital of France?',
  //     type: 'multiple-choice',
  //     choices: ['Paris', 'London', 'Berlin', 'Madrid'],
  //     correctAnswer: 'Paris'
  //   },
  //   {
  //     id: 2,
  //     text: 'The Earth is flat.',
  //     type: 'true-false',
  //     correctAnswer: false
  //   }
  // ];

  questionForm: FormArray ;

  constructor(private fb:FormBuilder , private router : Router, private activatedRoute: ActivatedRoute , private assessmentService:AssessmentService){
    this.activatedRoute.params.subscribe(params => {
      this.assessmentId = params['id'] ;
    })
    this.assessmentService.getAssessmentById(this.assessmentId).subscribe(data => {
      this.arrQuestions = data.questions ; 
      console.log(this.arrQuestions) ; 
    })
    this.questionForm = this.fb.array(this.arrQuestions.map(() => this.fb.group({
      answer: ['', Validators.required]
    })));
  }
  ngOnInit(): void {
    this.questionForm = this.fb.array(this.arrQuestions.map(() => this.fb.group({
      answer: ['', Validators.required]
    })));
  }

  submitAnswers(): void {
    const answers = this.questionForm.value;
    console.log('Submitted answers:', answers);
    // Handle the submission logic here
  }

  getFormGroup(index: number): FormGroup {
    return this.questionForm.at(index) as FormGroup;
  }
}
