import { Injectable } from '@angular/core';
import { Trainee } from '../models/trainee';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AssessmentTrainees } from '../models/assessmentTrainess';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  arrTrainees : Trainee[] = [] ; 
  baseUrl: string = 'http://localhost:3000';
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) { 
    
  }

  getTrainees(){
    return this.arrTrainees ; 
  }

  getTraineeByID(id:number){
    return this.arrTrainees[id] ; 
  }
  getAssessmentTrainess(){
    return this.httpClient.get<AssessmentTrainees[]>(this.baseUrl + "/assessmentTrainees", this.httpHeader).pipe(catchError(this.httpError));
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
