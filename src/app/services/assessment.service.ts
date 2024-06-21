import { Injectable } from '@angular/core';
import { Assessment } from '../models/assessment';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  constructor(private httpClient: HttpClient) {
    this.arrAssessments = [
      // Example assessments can be initialized here
      // new Assessment(1, "Angular Assessment", "Test your Angular skills", "/path/to/image.png", [], 2999),
    ];
  }

  getAssessments(): Observable<Assessment[]> {
    return this.httpClient.get<Assessment[]>(this.baseUrl + "/assessments", this.httpHeader)
      .pipe(catchError(this.httpError));
  }

  getAssessmentById(id: number): Observable<Assessment> {
    const localAssessment = this.arrAssessments.find(assessment => assessment.id === id);
    if (localAssessment) {
      return of(localAssessment);
    }
    return this.httpClient.get<Assessment>(`${this.baseUrl}/assessments/${id}`, this.httpHeader)
      .pipe(
        map((assessment: Assessment) => {
          this.arrAssessments.push(assessment);
          return assessment;
        }),
        catchError(this.httpError)
      );
  }

  addAssessment(assessment: Assessment): Observable<Assessment[]> {
    this.arrAssessments.push(assessment);
    return of(this.arrAssessments);
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
