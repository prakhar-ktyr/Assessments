import { Injectable } from '@angular/core';
import { AssessmentScore } from '../models/assessmentScore';

@Injectable({
  providedIn: 'root'
})
export class AssessmentScoreService {

  arrAssessmentScore : AssessmentScore[]  = []; 
  constructor() { 
    
  }

  getAssessmentScore(){
    return this.arrAssessmentScore ; 
  }

  getAssessmentScoreByID(id:number){
    return this.arrAssessmentScore[id] ; 
  }
}
