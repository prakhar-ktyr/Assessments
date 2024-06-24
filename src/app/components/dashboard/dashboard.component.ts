import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { LocalStorageService } from '../../services/local-storage.service';
import { AssessmentService } from '../../services/assessment.service';
import { TraineeService } from '../../services/trainee.service';
import { AssessmentTrainees } from '../../models/assessmentTrainess';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  arrAssessments : Assessment[] = [] ; 
  loggedUserId : string = "" ; 
  loggedUserRole: string = "" ; 
  arrAssessmentTrainees : AssessmentTrainees[] = [] ; 
  constructor(private localStorageService : LocalStorageService , private assessmentService : AssessmentService , private traineeService : TraineeService){
    let id = this.localStorageService.getItem("loggedUserId") ; 
    this.loggedUserId = id === null ? "0" : id ; 

    let role = this.localStorageService.getItem("role") ; 
    this.loggedUserRole = role === null ? "trainee" : role ; 

    if(role === 'Admin'){
     // just return arrAsessments 
     this.assessmentService.getAssessments().subscribe(data => {
      this.arrAssessments = data ; 
    })
    }
    else if(role === 'Trainee'){
      this.traineeService.getAssessmentTrainess().subscribe(data => {
        this.arrAssessmentTrainees = data ; 
        console.log(this.arrAssessmentTrainees) ; 

        let arrId:string[] = [] ; 
        for(let i = 0; i < this.arrAssessmentTrainees.length ; i++){
          if(this.arrAssessmentTrainees[i].traineeId === this.loggedUserId){
            arrId.push(this.arrAssessmentTrainees[i].assessmentId) ;
          }
        }

        let arrAssess:Assessment[] = [] ; 
        this.assessmentService.getAssessments().subscribe(data => {
          arrAssess = data ; 
        })

        for(let i = 0 ; i < arrId.length ; i++){
          for(let j = 0 ; j < arrAssess.length ; j++){
            if(String(arrAssess[j].id) === arrId[i]){
              this.arrAssessments.push(arrAssess[j]);
            }
          }
        }

        console.log(this.arrAssessments) ;
      })
    }
    else{
      this.assessmentService.getAssessments().subscribe(data => {
        for(let i = 0 ; i < data.length ; i++){
          // console.log(data[i].facultyId) ; 
          if(String(data[i].facultyId) === this.loggedUserId){
            this.arrAssessments.push(data[i]);
          }
        }
      })

    }
  }
}
