import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  arrAssessments : Assessment[] = [] ; 
  loggedUserId : string = "" ; 
  loggedUserRole: string = "" ; 
  constructor(private localStorageService : LocalStorageService){
    let id = this.localStorageService.getItem("loggedUserId") ; 
    this.loggedUserId = id === null ? "0" : id ; 

    let role = this.localStorageService.getItem("role") ; 
    this.loggedUserRole = role === null ? "trainee" : role ; 

    if(role === 'Admin'){

    }
    else if(role === 'trainee'){
      
    }
    else{

    }
  }
}
