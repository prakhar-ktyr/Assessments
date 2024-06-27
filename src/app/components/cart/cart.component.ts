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
    let arrAssTrainees:AssessmentTrainees[] ; 
    this.traineeService.getAssessmentTrainess().subscribe(data => {
      arrAssTrainees = data ; 
      this.currentUserCart.arrAssessments.forEach((ass , index) =>{
        let existsInDashboard = false ; 
        // check if current assessment already exists in dashboard
        for(let i = 0 ; i < arrAssTrainees.length ; i++){
          if(arrAssTrainees[i].assessmentId == String(ass.id) && arrAssTrainees[i].traineeId == this.loggedUserId){
            existsInDashboard = true ; 
            arrAssTrainees[i].quantity += this.currentUserCart.quantity[index] ; 
            break ;  
          }
        }
        // if it doesnt exist in dashboard
        if(!existsInDashboard){
          let newId = String(arrAssTrainees.length + 1);
          let newAssId = String(ass.id) ;
          arrAssTrainees.push(new AssessmentTrainees(newId , newAssId , this.loggedUserId , this.currentUserCart.quantity[index].toString()))
        }
      })
      // now update the dashboard 
      this.traineeService.updateAllAssessmentTrainees(arrAssTrainees).subscribe((data) =>{
        console.log("changed dashboard") ;
        // now clear cart
        let cartId = this.currentUserCart.id ; 
        this.cartService.deleteCart(cartId).subscribe(data => {
          console.log("deleted")
        })
      })
    })

  }
}
