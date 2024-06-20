import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assessment } from '../../models/assessment';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss'
})
export class ViewDetailsComponent {
  assessment:Assessment = new Assessment(0 , "" , "" , "" , []) ; 
constructor(private activatedRoute : ActivatedRoute){
  this.activatedRoute.params.subscribe((params) =>{
    console.log(params["id"]) ; 
    
  })
}
}
