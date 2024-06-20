import { Injectable } from '@angular/core';
import { Assessment } from '../models/assessment';
import { Question } from '../models/questions';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  arrAssessments: Assessment[] = [];
  baseUrl: string = 'http://localhost:3000';
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };
  constructor(private httpClient:HttpClient) {
    this.arrAssessments = [

    ];
  }

  getAssessments(): Observable<Assessment[]> {
    return this.httpClient.get<Assessment[]>(this.baseUrl + "/assessments" , this.httpHeader).pipe(catchError(this.httpError));
  }

  getAssessmentById(id: number): Assessment {
    return this.arrAssessments.find(assessment => assessment.id === id) || new Assessment(0, "", "", "", []);
  }

  addAssessment(assessment: Assessment): Observable<Assessment[]> {
    this.arrAssessments.push(assessment);
    return of(this.arrAssessments);
  }
  httpError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
