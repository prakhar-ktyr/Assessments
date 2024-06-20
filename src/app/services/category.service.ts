import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  arrCategory : Category[] = []; 
  constructor() { 
    
  }

  getCategory(){
    return this.arrCategory ; 
  }

  getCategoryByID(id:number){
    return this.arrCategory[id] ; 
  }
}
