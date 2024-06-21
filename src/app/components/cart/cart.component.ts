import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CartService } from '../../services/cart.service';
import { Assessment } from '../../models/assessment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  arrAssessments : Assessment[] = [] ; 
  arrQuantity: number[] = [] ; 
  constructor(private localStorageService:LocalStorageService , private cartService : CartService){
    let loggedUserId = localStorageService.getItem("loggedUserId") ; 
    if(loggedUserId === null){
      loggedUserId = "0" ; 
    }
    this.cartService.getCartByID(loggedUserId).subscribe(data => {
      this.arrAssessments = data.arrAssessments ; 
      this.arrQuantity = data.quantity ; 
    })
  }

  addQuantity(){

  }
  removeQuantity(){

  }
}
