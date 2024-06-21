import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CartService } from '../../services/cart.service';
import { Assessment } from '../../models/assessment';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  arrAssessments : Assessment[] = [] ; 
  arrQuantity: number[] = [] ; 
  cartId : number = 0 ; 
  currentUserCart : Cart = new Cart(0 , 0 , [] , [] , 0); 
  constructor(private localStorageService:LocalStorageService , private cartService : CartService){
    let loggedUserId = localStorageService.getItem("loggedUserId") ; 
    if(loggedUserId === null){
      loggedUserId = "0" ; 
    }
    this.cartService.getCartByID(loggedUserId).subscribe(data => {
      this.currentUserCart = data ;  
      this.cartId = data.id ; 
      this.arrAssessments = data.arrAssessments ; 
      this.arrQuantity = data.quantity ; 
      this.currentUserCart.total = this.calculateCost() ;
    })
  }
  calculateCost(){
    let cost = 0 ; 
      for(let i = 0 ; i < this.arrAssessments.length ; i++){
        cost += (this.currentUserCart.quantity[i] * this.currentUserCart.arrAssessments[i].price) ; 
      }
      return cost ;
  }
  addQuantity(addAssessmentId:number){
    this.cartService.getCartByID(String(this.cartId)).subscribe(data => {
      this.arrQuantity =  data.quantity; 
      this.arrQuantity[addAssessmentId] += 1 ; 
      this.currentUserCart.quantity = this.arrQuantity ;
      this.currentUserCart.total = this.calculateCost() ; 
      this.cartService.updateCartById(this.cartId , this.currentUserCart).subscribe(data => {
        
      })
    })
  }
  removeQuantity(removeAssessmentId:number){
    this.cartService.getCartByID(String(this.cartId)).subscribe(data => {
      this.arrQuantity =  data.quantity; 
      this.arrQuantity[removeAssessmentId] = Math.max(this.arrQuantity[removeAssessmentId] - 1 , 0) ;
      this.currentUserCart.quantity = this.arrQuantity ; 
      this.currentUserCart.total = this.calculateCost() ;
      this.cartService.updateCartById(this.cartId , this.currentUserCart).subscribe(data => {
 
      })
    })
  }
  getTotalCost(){
    return this.currentUserCart.total ; 
  }
  placeOrder(){

  }
}
