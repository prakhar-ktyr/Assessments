import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {

  courseAddForm: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseAddForm = this.fb.group({
      courseName: ['', Validators.required],
      courseDescription: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  isInvalid(controlName: string): boolean {
    const control = this.courseAddForm.get(controlName);
    return control?.invalid && (control?.touched || !control?.pristine) || false;
  }

  onSubmit(frmValue: any): void {
    console.log('Form Value:', frmValue);

    const newCourse: Course = {
      id: 0, // Set an appropriate id or generate it as needed
      courseName: frmValue.courseName,
      courseDescription: frmValue.courseDescription,
      categoryId: frmValue.categoryId
    };

    this.courseService.addCourse(newCourse).subscribe(
      (response: Course[]) => {
        console.log('Course added successfully', response);
      },
      (error: any) => {
        console.error('Error adding course', error);
      }
    );
  }
}
