import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AssessmentService } from '../../services/assessment.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  arrAssessments: Assessment[] = [];
  loggedUserId:string = "0" ; 
  constructor(
    private router: Router,
    private assessmentService: AssessmentService,
    private locatStorageService: LocalStorageService,
    private cartService: CartService
  ) {
    this.assessmentService.getAssessments().subscribe((data) => {
      for (let i = data.length - 1; i >= data.length - 3; i--) {
        this.arrAssessments.push(data[i]);
      }
    });
    let loginId = this.locatStorageService.getItem("loggedUserId") ; 
    this.loggedUserId = loginId === null ? "0" : loginId ; 
  }

  displayDetails(aid: number, aName: string, aDescription: string) {
    this.router.navigate(['viewDetails/' + aid]);
  }

  addToCart(newAssessmentForCart: Assessment) {
    // first check if the current user cart obj exists in db or not 
    let cartExists:boolean = false;
    let arrCart:Cart[] = [] ; 
    let cartId = this.locatStorageService.getItem('loggedUserId');
    if (cartId === null) {
      console.log("User not logged in , can't add to cart");
      return;
    }

    this.cartService.getCarts().subscribe(data => {
      console.log("fetched arrcarts")
      arrCart = data ; 

      for(let i = 0 ; i < arrCart.length ; i++){
        console.log(String(arrCart[i].id)   , this.loggedUserId) ; 
        if(String(arrCart[i].userId) === this.loggedUserId){
          cartExists = true ; 
          break ; 
        }
      }
      // if cart exist use put serivce else post service 
    
      if(cartExists){
        this.cartService.getCartByID(String(cartId)).subscribe((data) => {
          // check if assessment already exists
          let assessmentExistsInCart: boolean = false;
          for (let i = 0; i < data.arrAssessments.length; i++) {
            if (data.arrAssessments[i].id === newAssessmentForCart.id) {
              // then just increment
              data.quantity[i] += 1;
              assessmentExistsInCart = true;
              this.cartService.updateCartById( data.id , data).subscribe(data => {
              }) 
              break;
            }
          }
          
          if (!assessmentExistsInCart) {
            data.arrAssessments.push(newAssessmentForCart);
            data.quantity.push(1);
            this.cartService
              .addAssessmentToCart(Number(cartId), data)
              .subscribe((data) => {
              });
          }
        });
      }
      else{
        console.log("Cart doesnt exist with this userid") ; 
        let id = Number(this.loggedUserId) ; 
        // let newCart = new Cart(id , id , [newAssessmentForCart] , [1] , newAssessmentForCart.price) ; 
        let obj = {
          id:this.loggedUserId ,
          userId:this.loggedUserId , 
          quantity:[1] , 
          total:newAssessmentForCart.price,
          arrAssessments:[newAssessmentForCart]
        }
        // console.log(newCart) ; 
        this.cartService.addNewCart(obj).subscribe(data => {
          console.log("added cart")
        })
      }
    })
  }
}
