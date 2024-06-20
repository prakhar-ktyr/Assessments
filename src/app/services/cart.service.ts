import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  arrCart : Cart[] = []; 
  constructor() { 
    
  }

  getCart(){
    return this.arrCart ; 
  }

  getCartByID(id:number){
    return this.arrCart[id] ; 
  }
}
