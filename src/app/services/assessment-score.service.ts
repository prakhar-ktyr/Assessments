import { Injectable } from '@angular/core';
import { AssessmentScore } from '../models/assessmentScore';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssessmentScoreService {
  baseUrl: string = 'http://localhost:3000';
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };
 
  constructor(private httpClient:HttpClient) { 
    
  }

  getAssessmentScore(){
    return this.httpClient.get<AssessmentScore[]>(this.baseUrl + "/assessmentScore/" , this.httpHeader).pipe(catchError(this.httpError)) ; 
  }
  postAssessmentScore(a:AssessmentScore){
    return this.httpClient.post<AssessmentScore>(this.baseUrl + "/assessmentScore/" , a , this.httpHeader).pipe(catchError(this.httpError)) ; 
  }
  getAssessmentScoreByID(id:number){
    // return this.arrAssessmentScore[id] ; 
  }
  private httpError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(msg);
    return throwError(msg);
  }
}
