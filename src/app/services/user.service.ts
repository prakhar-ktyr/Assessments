import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Address } from '../models/address';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  arrUsers: User[] = []

  constructor() { 
    this.arrUsers = [
      new User(1, "John", "Doe", "johndoe@gmail.com", "9876543210", 
        [new Address(1, 101, "1st Main", "1st Block", "Bangalore", "Karnataka", "India", "560001")], "password", "01/01/1990", "Admin"),
      new User(2, "Jane", "Doe", "janedoe@gmail.com", "9876543211",
        [new Address(2, 201, "2nd Main", "2nd Block", "Bangalore", "Karnataka", "India", "560002")], "password", "01/01/1991", "User")
    ]
  }

  getUsers(): User[] {
    return this.arrUsers;
  }

  getUserById(id: number): User {
    for (let i = 0; i < this.arrUsers.length; i++) {
      if (id == this.arrUsers[i].id) {
        return this.arrUsers[i];
      }
    }

    return new User(0, "", "", "", "", [new Address(0, 0, "", "", "", "", "", "")], "", "", "");
  }

  addUser(user: User): Observable<User[]> {
    this.arrUsers.push(user);
    console.log(this.arrUsers);
    return of(this.arrUsers);
  }

  updateUser(user: User): Observable<User[]> {
    for (let i = 0; i < this.arrUsers.length; i++) {
      if (user.id == this.arrUsers[i].id) {
        this.arrUsers[i] = user;
      }
    }

    return of(this.arrUsers);
  }
}
