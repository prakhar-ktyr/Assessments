import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AssessmentService } from '../../services/assessment.service';
import { Assessment } from '../../models/assessment';
import { Question } from '../../models/questions';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.scss']
})
export class CreateAssessmentComponent implements OnInit {
  isLinear = true;
  assessmentForm: FormGroup;
  questionsForm: FormGroup;

  constructor(private fb: FormBuilder, private assessmentService: AssessmentService) {
    this.assessmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      assessmentImage: ['', Validators.required]
    });

    this.questionsForm = this.fb.group({
      questions: this.fb.array([this.createQuestion()])
    });
  }

  ngOnInit(): void {}

  createQuestion(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      type: ['', Validators.required],
      choices: this.fb.array([this.createChoice(), this.createChoice(), this.createChoice(), this.createChoice()]),
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
    (this.questionsForm.get('questions') as FormArray).push(this.createQuestion());
  }

  saveFirstStepData(formGroup: FormGroup) {
    console.log('First Step Data:', formGroup.value);
  }

  saveSecondStepData(formGroup: FormGroup) {
    console.log('Second Step Data:', formGroup);
  }

  onSubmit(): void {
    const assessmentData = this.assessmentForm.value;
    const questionsData = this.questionsForm.value.questions;
    
    const newAssessment = new Assessment(
      0, // ID will be generated
      assessmentData.name,
      assessmentData.description,
      assessmentData.assessmentImage,
      questionsData
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


  // Method to safely get the choices FormArray for a specific question
  getChoices(questionIndex: number): FormArray {
    const questionFormGroup = this.questionControls.at(questionIndex) as FormGroup;
    const choices = questionFormGroup.get('choices');
    if (choices instanceof FormArray) { // Type check to ensure it's a FormArray
      return choices;
    }
    throw new Error('Choices control is missing or not a FormArray');
  }
}
