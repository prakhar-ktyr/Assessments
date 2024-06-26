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
  questionForm!: FormArray ;
  finalScore:number = -1; 
  constructor(private fb:FormBuilder , private router : Router, private activatedRoute: ActivatedRoute , private assessmentService:AssessmentService){
    this.activatedRoute.params.subscribe(params => {
      this.assessmentId = params['id'] ;
    })
    this.assessmentService.getAssessmentById(this.assessmentId).subscribe(data => {
      this.arrQuestions = data.questions ;
      // console.log(data.questions) ; 
      console.log(this.arrQuestions) ; 
      this.questionForm = this.fb.array(this.arrQuestions.map(() => this.fb.group({
        answer: ['', Validators.required]
      })));
    })
  }
  ngOnInit(): void {
 
  }

  submitAnswers(): void {
    const answers = this.questionForm.value;
    console.log('Submitted answers:', answers);
    this.finalScore = this.getScore(answers) ; 
    // Handle the submission logic here
  }

  getScore(answers:any){
    console.log(answers) ; 
    let score : number = 0 ;  
    for(let i = 0; i < this.arrQuestions.length ; i++){
      let ans = answers[i].answer ; 
      if(this.arrQuestions[i].type === 'true-false'){
        if(this.arrQuestions[i].correctAnswer === ans.toString()){
          score += 1 ; 
        }
      }
      else{
        if(this.arrQuestions[i].correctAnswer === ans){
          score += 1 ; 
        }
      }
    }
    return score ; 
  }
  getFormGroup(index: number): FormGroup {
    return this.questionForm.at(index) as FormGroup;
  }
}
