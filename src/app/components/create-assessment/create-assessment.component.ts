import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AssessmentService } from '../../services/assessment.service';
import { Assessment } from '../../models/assessment';
import { Question } from '../../models/questions';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.scss']
})
export class CreateAssessmentComponent implements OnInit {
  assessmentForm: FormGroup;
  questionsForm: FormGroup;
  loggedUserId: string = '';

  constructor(private localStorageService: LocalStorageService,private fb: FormBuilder, private assessmentService: AssessmentService) {
    this.assessmentForm = this.fb.group({
      assessmentName: ['', Validators.required],
      assessmentDescription: ['', Validators.required],
      assessmentImage: ['', Validators.required],
      price: ['', Validators.required],
      time: ['', Validators.required] // Time is treated as a string
    });

    this.loggedUserId = this.localStorageService.getItem('loggedUserId') || '0';

    this.questionsForm = this.fb.group({
      questions: this.fb.array([this.createQuestion(1)])
    });
  }

  ngOnInit(): void {}

  createQuestion(id: number): FormGroup {
    return this.fb.group({
      id: [id, Validators.required],
      text: ['', Validators.required],
      type: ['', Validators.required],
      choices: this.fb.array([]),
      correctAnswer: ['', Validators.required]
    });
  }

  createChoice(): FormGroup {
    return this.fb.group({
      choiceText: ['', Validators.required]
    });
  }

  get questionControls() {
    return (this.questionsForm.get('questions') as FormArray).controls;
  }

  addQuestion(): void {
    const questionArray = this.questionsForm.get('questions') as FormArray;
    const newQuestionId = questionArray.length + 1;
    questionArray.push(this.createQuestion(newQuestionId));
  }

  getChoices(questionIndex: number): FormArray {
    return (this.questionsForm.get('questions') as FormArray).at(questionIndex).get('choices') as FormArray;
  }

  onQuestionTypeChange(questionIndex: number): void {
    const questionArray = this.questionsForm.get('questions') as FormArray;
    const question = questionArray.at(questionIndex) as FormGroup;

    const choicesArray = question.get('choices') as FormArray;
    while (choicesArray.length !== 0) {
      choicesArray.removeAt(0);
    }

    if (question.get('type')?.value === 'multiple-choice') {
      for (let i = 0; i < 4; i++) {
        choicesArray.push(this.createChoice());
      }
    } else if (question.get('type')?.value === 'true-false') {
      choicesArray.push(this.fb.group({ choiceText: 'true' }));
      choicesArray.push(this.fb.group({ choiceText: 'false' }));
    }
  }

  submitAssessment(): void {
    const assessmentData = this.assessmentForm.value;
    const questionsData = this.questionsForm.value.questions.map((question: any, index: number) => ({
      ...question,
      id: index + 1,
      choices: question.type === 'true-false' ? ['true', 'false'] : question.choices.map((choice: any) => choice.choiceText)
    }));

    const newAssessment = new Assessment(
      0, // ID will be generated
      assessmentData.assessmentName,
      assessmentData.assessmentDescription,
      assessmentData.assessmentImage,
      questionsData,
      assessmentData.price,
      parseInt(this.loggedUserId), // Default faculty ID, update as necessary
      assessmentData.time,
      true
    );

    this.assessmentService.addAssessment(newAssessment).subscribe(
      response => {
        console.log('Assessment created successfully:', response);
      },
      error => {
        console.error('Error creating assessment:', error);
      }
    );
  }
}
