import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { CartService } from '../../services/cart.service';
import { Assessment } from '../../models/assessment';
import { Cart } from '../../models/cart';
import { TraineeService } from '../../services/trainee.service';
import { AssessmentTrainees } from '../../models/assessmentTrainess';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent { 
  currentUserCart : Cart = new Cart(0 , 0 , [] , [] , 0); 
  loggedUserId : string = "" ; 
  constructor(private traineeService:TraineeService , private localStorageService:LocalStorageService , private cartService : CartService){
    let loggedId = localStorageService.getItem("loggedUserId") ; 
    if(loggedId === null){
      loggedId = "0" ; 
    }
    this.loggedUserId = loggedId ; 
    this.cartService.getCartByID(this.loggedUserId).subscribe(data => {
      this.currentUserCart = data ;  
      this.currentUserCart.total = this.calculateCost() ;
    })
  }
  calculateCost(){
    let cost = 0 ; 
      for(let i = 0 ; i < this.currentUserCart.arrAssessments.length ; i++){
        cost += (this.currentUserCart.quantity[i] * this.currentUserCart.arrAssessments[i].price) ; 
      }
      return cost ;
  }
  addQuantity(addAssessmentId:number){
    this.cartService.getCartByID(String(this.currentUserCart.userId)).subscribe(data => {
      this.currentUserCart.quantity =  data.quantity; 
      this.currentUserCart.quantity[addAssessmentId] += 1 ; 
      this.currentUserCart.total = this.calculateCost() ; 
      this.cartService.updateCartById(this.currentUserCart.userId , this.currentUserCart).subscribe(data => {
        
      })
    })
  }
  removeQuantity(removeAssessmentId:number){
    this.cartService.getCartByID(String(this.currentUserCart.userId)).subscribe(data => {
      this.currentUserCart.quantity =  data.quantity; 
      this.currentUserCart.quantity[removeAssessmentId] = Math.max(this.currentUserCart.quantity[removeAssessmentId] - 1 , 0) ;
      this.currentUserCart.total = this.calculateCost() ;
      this.cartService.updateCartById(this.currentUserCart.userId , this.currentUserCart).subscribe(data => {
 
      })
    })
  }
  getTotalCost(){
    return this.currentUserCart.total ; 
  }
  placeOrder(){
    this.traineeService.getAssessmentTrainess().subscribe(data => {
      let currentId = data.length + 1 ;
      console.log(data) ; 
      let arr :AssessmentTrainees[] = data ; 
      for(let i = 0 ; i < this.currentUserCart.quantity.length ; i++){
        let aid = String(this.currentUserCart.arrAssessments[i].id) ; 
        let id = String(currentId) ; 
        let q = String(this.currentUserCart.quantity[i]) ; 
        // let obj:AssessmentTrainees = new AssessmentTrainees(id , aid , this.loggedUserId , q) ; 
        // arr.push(obj) ; 

        currentId += 1 ;
      } 
      //  this.traineeService.updateAssessmentTrainees(data).subscribe(data => {
      //     console.log(data) ;
      //   })
      console.log(arr) ; 
      
    })
  }
}
