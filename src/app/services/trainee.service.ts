import { Injectable } from '@angular/core';
import { Trainee } from '../models/trainee';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  arrTrainees : Trainee[] = [] ; 
  constructor() { 
    
  }

  getTrainees(){
    return this.arrTrainees ; 
  }

  getTraineeByID(id:number){
    return this.arrTrainees[id] ; 
  }
}
