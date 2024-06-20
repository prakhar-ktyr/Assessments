import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss'
})
export class ViewDetailsComponent {
constructor(private activatedRoute : ActivatedRoute){
  this.activatedRoute.params.subscribe((params) =>{
    console.log(params["id"]) ; 
  })
}
}
