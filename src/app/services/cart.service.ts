import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = 'http://localhost:3000';
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };
  arrCart : Cart[] = []; 
  constructor(private httpClient: HttpClient) { 
    
  }

  getCarts(): Observable<Cart[]>{
     return this.httpClient.get<Cart[]>(this.baseUrl + "/cart" , this.httpHeader).pipe(catchError(this.httpError)); 
  }

  getCartByID(id:string){
    return this.httpClient.get<Cart>(this.baseUrl + '/cart/' + id , this.httpHeader)
    .pipe(catchError(this.httpError));
  }
  httpError(error:HttpErrorResponse){
    let msg='';
    if(error.error instanceof ErrorEvent){
      msg=error.error.message;
    }
    else{
      msg=`Error Code:${error.status}\nMessafe:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
