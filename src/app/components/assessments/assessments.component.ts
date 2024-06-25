import { Component, OnInit } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.scss']
})
export class AssessmentsComponent implements OnInit {
  loggedUserId:string = "" ; 
  arrAssessments: Assessment[] = [];
  pagedAssessments: Assessment[] = [];
  assessment: Assessment = new Assessment(0, "", "", "", [], 0, 0);
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(private assessmentService: AssessmentService, private router: Router ,  private locatStorageService: LocalStorageService,
    private cartService: CartService) {

      let loginId = this.locatStorageService.getItem("loggedUserId") ; 
    this.loggedUserId = loginId === null ? "0" : loginId ; 
     }

  ngOnInit(): void {
    this.assessmentService.getAssessments().subscribe((assessments: Assessment[]) => {
      this.arrAssessments = assessments;
      this.totalPages = Math.ceil(this.arrAssessments.length / this.pageSize);
      this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
      this.updatePagedAssessments();
    });
  }

  updatePagedAssessments(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedAssessments = this.arrAssessments.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagedAssessments();
  }

  displayDetails(aid: number, aName: string, aDescription: string): void {
    this.router.navigate(["viewDetails/" + aid]);
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
