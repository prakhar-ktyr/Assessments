import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Attendance } from '../../models/attendance';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-update-attendance',
  templateUrl: './update-attendance.component.html',
  styleUrl: './update-attendance.component.scss'
})
export class UpdateAttendanceComponent {
  arrAttendance!: Attendance[] ;
  selectedId:number=0;
  updateForm: FormGroup;
  selectedAttendance!: Attendance;

  constructor(private fb: FormBuilder , private attendanceService : AttendanceService) {
    this.updateForm = this.fb.group({
      userId: ['', Validators.required],
      date: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.selectedAttendance = new Attendance("0","0",new Date() ,"success");
    this.attendanceService.getAttendance().subscribe(data => {
      this.arrAttendance = data ; 
    })
  }

  onSelectChange(event: any): void {
    const selectedId = event.target.value;
    this.selectedId = selectedId ; 
    this.attendanceService.getAttendanceById(selectedId).subscribe(data => {
      console.log(data) ; 
    })
    if (this.selectedAttendance) {
      this.updateForm.patchValue({
        userId: String(this.selectedAttendance.userId),
        date: this.selectedAttendance.date.toISOString(),
        status: this.selectedAttendance.status
      });
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      let obj = this.updateForm.value ; 
      let newAtt:Attendance = new Attendance(String(this.selectedId) , obj.userId , obj.date , obj.status); 
      this.attendanceService.updateAttendance(this.selectedId , newAtt).subscribe(data => {
        console.log("Attendance updated") ; 
      })
      // Handle form submission logic here
    }
  }
}
