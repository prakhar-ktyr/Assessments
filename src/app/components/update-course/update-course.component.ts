import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss'],
})
export class UpdateCourseComponent implements OnInit {
  courseUpdateForm: FormGroup;
  arrCourses: Course[] = [];
  idUpdated: string = '';

  constructor(private fb: FormBuilder, private courseService: CourseService) {
    this.courseUpdateForm = this.fb.group({
      id: ['', Validators.required],
      courseName: ['', Validators.required],
      courseDescription: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses: Course[]) => {
      this.arrCourses = courses;
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.courseUpdateForm.get(controlName);
    return control?.invalid && (control?.touched || !control?.pristine) || false;
  }

  onSubmit(frmValue: any): void {
    console.log('Form Value:', frmValue);

    const updatedCourse: Course = {
      id: frmValue.id,
      courseName: frmValue.courseName,
      courseDescription: frmValue.courseDescription,
      categoryId: frmValue.categoryId
    };

    this.courseService.updateCourse(updatedCourse).subscribe(
      (response: Course[]) => {
        console.log('Course updated successfully', response);
      },
      (error: any) => {
        console.error('Error updating course', error);
      }
    );
  }

  onChangeType(evt: any): void {
    console.log(evt.target.value);

    var idObtained = evt.target.value;
    this.idUpdated = idObtained.trim();
    console.log(this.idUpdated);

    for (var i = 0; i < this.arrCourses.length; i++) {
      if (this.idUpdated === this.arrCourses[i].id) {
        this.courseUpdateForm.patchValue({
          id: this.arrCourses[i].id,
          courseName: this.arrCourses[i].courseName,
          courseDescription: this.arrCourses[i].courseDescription,
          categoryId: this.arrCourses[i].categoryId
        });
      }
    }
  }
}
